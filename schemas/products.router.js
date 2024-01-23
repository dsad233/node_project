import mongoose from 'mongoose';



const phoneschema = new mongoose.Schema({
    _id: {
        type: String,
        required: false,
        unique: false
    },
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
        required: false,
        unique: false
    },
    createdAt: {
        type: Date,
        required: false,
        unique: false
    }
});

export default mongoose.model('Phone', phoneschema);

