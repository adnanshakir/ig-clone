const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You can't follow yourself!",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User doesn't exists",
    });
  }

  const isAlreadyFollowed = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowed) {
    return res.status(200).json({
      message: "You are already following this user!",
      follow: isAlreadyFollowed,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `You are following ${followeeUsername}`,
    follow: followRecord,
  });
}

async function unfollowController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(400).json({
      message: `Your are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  return res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
  });
}

async function statusController(req, res) {
  const follower = req.params.username;
  const followee = req.user.username;
  const { newStatus } = req.body;

  if (!newStatus) {
    return res.status(400).json({
      message: "You update the value of status",
    });
  }

  if (!["accepted", "rejected"].includes(newStatus)) {
    return res.status(400).json({
      message: "Invalid value of status",
    });
  }

  const updatedFollow = await followModel.findOneAndUpdate(
    {
      follower: follower,
      followee: followee,
      status: "pending",
    },
    { $set: { status: newStatus } },
    { new: true },
  );

  if (!updatedFollow) {
    return res.status(400).json({
      message: "No pending follow request found!",
    });
  }

  if (updatedFollow) {
    return res.status(201).json({
      message: `Request ${newStatus}`,
      updatedFollow,
    });
  }
}

module.exports = {
  followController,
  unfollowController,
  statusController,
};
