const router = require('express').Router();
const Post = require('../models/Post')

// create a post
router.post('/', async (req, res) => {
    try {
        const { userId, title, description, image_url, video_url, createdBy, createdAt } = req.body;
        const post = new Post({
            userId: userId,
            title: title,
            description: description,
            image_url: image_url,
            video_url: video_url,

            createdBy: createdBy,
            createdAt: createdAt
        })

        const savedPost = await post.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
});
router.post("/", async (req, res) => {
    const { text, image_url, video_url, createdBy } = req.body;
    const post = new Post({
      text: text,
      image_url: image_url,
      video_url: video_url,
      createdBy: createdBy,
    });
  
    await post.save();
    res.send("Post created succesfully");
  });

// router.get('/', async (req, res) => {
//     Post.find({}, function (err, post) {
//         res.send(post);
//     });

// });

// update a post

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been update");
        }
        else {
            res.status(403).json('you can update your post');
         }

    } catch (err) {
        res.status(500).json(err)
    }
});
// delete a post

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been Deleted");
        }
        else {
            res.status(403).json('you can delete your post');
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

// like a post

router.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;