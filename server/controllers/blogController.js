import express from "express";
import Blog from "../models/Blog.js";
import verifyToken from "../middlewares/VerifyToken.js";
import User from '../models/User.js'

const blogController = express.Router();

blogController.get("/getAll", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author", "username profilePic");


    const formattedBlogs = blogs.map(blog => {
      const { author } = blog;
      return {
        ...blog._doc,
        author: author
          ? {
              username: author.username,
              profilePic: author.profilePic?.data
                ? `data:${author.profilePic.contentType};base64,${author.profilePic.data.toString("base64")}`
                : null, // Handle cases where profilePic is missing
            }
          : null,
      };
    });

    return res.status(200).json(formattedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to retrieve blogs", error });
  }
});



blogController.get('/getUserBlogs/:id',async(req,res)=>{
  try {
    const userId=req.params.id;
    const blogs= await Blog.find({author:userId}).select('title');;
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({message:'Failed to get blogs', error});
  }
})

blogController.get("/find/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "username profilePic")
      .populate("comments.user","_id username profilePic");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Convert author's profilePic to base64 format
    const formatProfilePic = (profilePic) => {
      if (profilePic && profilePic.data) {
        return `data:${profilePic.contentType};base64,${profilePic.data.toString("base64")}`;
      }
      return null; // Return null if no profile picture
    };

    const formattedBlog = {
      ...blog._doc,
      author: blog.author
        ? {
            username: blog.author.username,
            profilePic: formatProfilePic(blog.author.profilePic), // Format author profilePic to base64
          }
        : null,
      comments: blog.comments.map((comment) => ({
        ...comment._doc,
        user: comment.user
          ? {
              _id:comment.user._id,
              username: comment.user.username,
              profilePic: formatProfilePic(comment.user.profilePic), // Format comment user's profilePic to base64
            }
          : null,
      })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    };

    // Increment the view count
    formattedBlog.views += 1;
    await Blog.findByIdAndUpdate(req.params.id, { views: formattedBlog.views });

    return res.status(200).json(formattedBlog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ message: "Failed to retrieve blog", error });
  }
});



blogController.post("/", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user.id });
    return res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve blogs", error });
  }
});

blogController.put("/upvote/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.upvotes.includes(req.user.id)) {
      blog.upvotes = blog.upvotes.filter(
        (userID) => userID.toString() !== req.user.id.toString()
        );
      await blog.save();
      return res.status(201).json({ msg: "Removed the upvote", blog: blog.upvotes });
    } else {
      blog.upvotes.push(req.user.id);
      await blog.save();
      return res.status(201).json({ msg: "Upvoted successfully",blog: blog.upvotes });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve blogs", error });
  }
});

blogController.put("/downvote/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.downvotes.includes(req.user.id)) {
      blog.downvotes = blog.downvotes.filter(
        (userID) => userID.toString() !== req.user.id.toString()
      );
      await blog.save();
      return res.status(201).json({ msg: "Removed the downvote",blog: blog.downvotes });
    } else {
      blog.downvotes.push(req.user.id);
      await blog.save();
      return res.status(201).json({ msg: "downvoted successfully", blog: blog.downvotes });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve blogs", error });
  }
});

blogController.put("/updateBlog/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.author.toString() !== req.user.id.toString()) {
      throw new Error({ msg: "You can only edit your own blogs" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate("author", "-password");
    return res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve blogs", error });
  }
});

blogController.delete("/deleteBlog/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.author.toString() !== req.user.id.toString()) {
      throw new Error({ msg: "You can only edit your own blogs" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Successfully deleted" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

blogController.post("/addComment/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = {
      user: req.user.id, // Reference to the user
      username: user.username,
      text: req.body.text,
      createdAt: Date.now(),
    };

    blog.comments.push(newComment);
    await blog.save();

    // Re-fetch the blog with populated comments
    const updatedBlog = await Blog.findById(req.params.id)
      .populate("comments.user", "_id username profilePic");

    // Convert profile pictures to base64 if needed
    const formatProfilePic = (profilePic) => {
      if (profilePic && profilePic.data) {
        return `data:${profilePic.contentType};base64,${profilePic.data.toString("base64")}`;
      }
      return null;
    };

    const formattedComments = updatedBlog.comments.map((comment) => ({
      ...comment._doc,
      user: comment.user
        ? {
            _id: comment.user._id,
            username: comment.user.username,
            profilePic: formatProfilePic(comment.user.profilePic),
          }
        : null,
    })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));;

    return res.status(200).json({
      message: "Comment added successfully",
      comments: formattedComments,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Failed to add comment", error });
  }
});



blogController.delete(
  "/deleteComment/:blogId/:comId",
  verifyToken,
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (!blog) return res.status(404).json({ msg: "Blog post not found" });

      const comment = blog.comments.id(req.params.comId);
      if (comment.user.toString() !== req.user.id.toString()) {
        return res
          .status(403)
          .json({ msg: "You can only delete your own comments" });
      }
      blog.comments.pull(req.params.comId);
      await blog.save();
      return res.status(200).json({ msg: "comment deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete comment", error });
    }
  }
);

blogController.put(
  "/editComment/:blogId/:comId",
  verifyToken,
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (!blog) return res.status(404).json({ msg: "Blog post not found" });

      const comment = blog.comments.id(req.params.comId);
      if (comment.user.toString() !== req.user.id.toString()) {
        return res
          .status(403)
          .json({ msg: "You can only edit your own comments" });
      }
      comment.text = req.body.text;
      await blog.save();
      return res.status(200).json({ msg: "comment edited successfully"});
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to edit comment", error });
    }
  }
);

export default blogController;
