import mongoose from 'mongoose';

const userChatsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Reference to the User model
            required: true
        },
        chats: [
            {
                chatId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Chat',
                    required: true
                },
                title: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now  
                }
            }
        ]
    },
    { timestamps: true } 
);

const UserChat = mongoose.model('UserChats', userChatsSchema);
export default UserChat;
