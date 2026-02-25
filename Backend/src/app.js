const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ credentials: true, origin: ["http://localhost:5173", "http://127.0.0.1:5173"]})); // For cookies & port r running on different ports
app.use(express.json());
app.use(cookieParser());

// All routes
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");

// In use routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
