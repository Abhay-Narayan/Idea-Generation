import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Reference to the User model
            required: true
        },
        history: [
            {
                role: {
                    type: String,
                    enum: ["user", "model"],  
                    required: true
                },
                parts: [
                    {
                        text: {
                            type: String,
                            required: true
                        }
                    }
                ]
            }
        ]
    },
    { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
