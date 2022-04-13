const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

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

router.get("/", async (req, res) => {
  const post = await Post.find({}).populate("createdBy", [
    "profile_image",
    "_id",
    "username",
  ]).sort({"createdAt": -1}).limit(10);
  res.send(post);
});

router.get("/:id", async (req, res) => {
  const post = Post.findOne({ _id: req.params.id }).populate("createdBy", [
    "profile_image",
    "_id",
    "username",
  ]);
  res.send(post);
});

router.put("/like/:id", async (req, res) => {
  Post.updateOne({ _id: req.params.id }, { like: "0" }, function (err, post) {
    res.send(post);
  });
});

router.put("/unlike/:id", async (req, res) => {
  Post.updateOne({ _id: req.params.id }, { like: "0" }, function (err, post) {
    res.send(post);
  });
});

router.put("/add-comment/:id", async (req, res) => {
  Post.updateOne(
    { _id: req.params.id },
    { $push: { comments: [req.body.comment_id] } },
    function (err, post) {
      res.send(post);
    }
  );
});

router.put("/remove-comment/:id", async (req, res) => {
  Post.updateOne({ _id: req.params.id }, { like: "0" }, function (err, post) {
    res.send(post);
  });
});

router.delete("/:id", async (req, res) => {
  Post.deleteOne({ _id: req.params.id }, function (err, post) {
    res.send(post);
  });
});

module.exports = router;
