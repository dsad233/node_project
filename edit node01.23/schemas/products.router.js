import mongoose from 'mongoose';



const phoneschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type : String,
        required : false,
        unique : false
    },
    author: {
        type: String,
        required: false,
        unique: false
    },
    password : {
        type : String,
        required : false,
        unique : false
    },
    status: {
        type: String,
        enum: ["FOR_SALE", "SOLD_OUT"],
        default : "FOR_SALE"
    }
}, {timestamps : true}
);

export default mongoose.model('Phone', phoneschema);

