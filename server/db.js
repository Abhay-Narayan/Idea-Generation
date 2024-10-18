import mongoose from "mongoose"

const connect=async()=>{
    await mongoose.connect(process.env.MONGO_URI).then(console.log('connected to mongodb atlas'));
}

export default connect;

