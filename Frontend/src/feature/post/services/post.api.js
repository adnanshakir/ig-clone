import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getFeed() {
  const response = await api.get("/api/posts/feed");
  return response.data;
}

// export async function createPost(file) {
//   const response = await api.post("/upload", {
//     file,
//   });

//   return response.data;
// }

// export async function getPosts(userId) {
//   const response = await api.get("/", {
//     userId,
//   });

//   return response.data;
// }

// export async function detailedPost(userId, postId) {
//   const response = await api.get("/details/:postId", {
//     userId,
//     postId,
//   });

//   return response.data;
// }

// export async function likePost(postId, username) {
//   const response = await api.post("/like/:postId", {
//     postId,
//     username,
//   });

//   return response.data;
// }
