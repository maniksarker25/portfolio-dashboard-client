import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import BasicInformation from "../pages/BasicInformation";
import Skills from "../pages/Skills";
import AddProject from "../pages/AddProject";
import Projects from "../pages/Projects";
import Blogs from "../pages/Blogs";
import Login from "../pages/Login";
import Experience from "../pages/Experience";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "/",
      //   element: <BasicInformation />,
      // },
      {
        path: "/",
        element: <Skills />,
      },
      {
        path: "/add-project",
        element: <AddProject />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/experience",
        element: <Experience />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  //   {
  //     path: "/register",
  //     element: <Register />,
  //   },
]);

export default router;
