import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./feature/auth/auth.context";
import { PostContextProvider } from "./feature/post/post.context";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
