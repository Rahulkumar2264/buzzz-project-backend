const router=require('express').Router();
const Post = require('../models/Post')


router.post('/',async (req,res)=>
{   
    const {title,description,image_url,video_url,createdBy}=req.body;
    const post=new Post({
        title:title,
        description:description,
        image_url:image_url,
        video_url:video_url,
        createdBy:createdBy
    })
    
    await post.save();
    res.send('Post created succesfully');


});

router.get('/',async (req,res)=>
{   
    Post.find({}, function(err, post) {
        res.send(post);
    });
    


});



module.exports=router;