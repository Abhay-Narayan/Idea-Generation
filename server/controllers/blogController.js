import express from "express";
import Blog from "../models/Blog.js";
import verifyToken from "../middlewares/VerifyToken.js";

const blogController = express.Router();

blogController.get("/getAll", async (req, res) => {
  try {
    const blog = await Blog.find()
      .sort({ upvotes: -1 })
      .populate("author", "name");
    return res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve blogs", error });
  }
});

blogController.get("/find/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "-password")
      .populate({
        path: "comments.user",
        select: "username",
      });
    blog.views += 1;
    await blog.save();
    return res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve blogs", error });
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
      blog.upvotes = blog.upvotes.filter((userID) => userID !== req.user.id);
      await blog.save();
      return res.status(201).json({ msg: "Removed the upvote" });
    } else {
      blog.upvotes.push(req.user.id);
      await blog.save();
      return res.status(201).json({ msg: "Upvoted successfully" });
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
        (userID) => userID !== req.user.id
      );
      await blog.save();
      return res.status(201).json({ msg: "Removed the downvote" });
    } else {
      blog.downvotes.push(req.user.id);
      await blog.save();
      return res.status(201).json({ msg: "downvoted successfully" });
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

    const newComment = {
      user: req.user.id, // Assuming `req.user.id` contains the authenticated user's ID
      text: req.body.text,
      createdAt: Date.now(),
    };

    blog.comments.push(newComment);
    await blog.save();

    return res
      .status(200)
      .json({ message: "Comment added successfully", blog });
  } catch (error) {
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
      return res.status(200).json({ msg: "comment deleted successfully",blog });
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
      return res.status(200).json({ msg: "comment edited successfully",blog });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to edit comment", error });
    }
  }
);

export default blogController;
