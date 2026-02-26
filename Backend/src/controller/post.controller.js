const bcrypt = require("bcryptjs");
require("dotenv").config();
const imageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");

const imagekit = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "Instagram",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created!",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "All of your posts",
    posts,
  });
}

async function getPostDetailController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isUserValid = post.user.toString() === userId.toString();

  if (!isUserValid) {
    return res.status(403).json({
      message: "Forbidden access",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!postId) {
    return res.status(400).json({
      message: "Post not found",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  return res.status(200).json({
    message: "Post liked successfully",
    like,
  });
}

async function unlikePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const isLiked = await likeModel.findOne({
    post: postId,
    user: username,
  });

  if (!isLiked) {
    return res.status(400).json({
      message: "Post wasn't liked!",
    });
  }

  await likeModel.findOneAndDelete({ _id: isLiked._id });

  return res.status(200).json({
    message: "Post unliked successfully!",
  });
}

async function getFeedController(req, res) {
  const user = req.user;

  const posts = await Promise.all(
    (
      await postModel
        .find()
        .populate("user")
        .sort({ _id: -1 }) // ✅ correct
        .lean()
    ).map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: user.username,
        post: post._id,
      });

      post.isLiked = Boolean(isLiked);
      return post;
    }),
  );

  res.status(200).json({
    message: "Post fetched successfully!",
    posts,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailController,
  likePostController,
  getFeedController,
  unlikePostController,
};
