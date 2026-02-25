const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
    },
    followee: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "rejected", "accepted"],
      message: "Status can only be pending, accepted or rejected"
    },
  },
  {
    timestamps: true,
  },
);

// the combination of follower & followee must be unique
followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel;
