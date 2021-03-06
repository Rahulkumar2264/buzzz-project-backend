const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    
    text:{
        type:String,
        required:true,
    },
    image_url:{
        type:String,
        required:false,

    },
    video_url:{
        type:String,
        required:false,
    },
    like:{
        type:Number,
        required: false,
        default:0,

    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    createdBy: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt:{
        type : Date, 
        default: Date.now,

    }

});
module.exports = mongoose.model('Post',postSchema);
