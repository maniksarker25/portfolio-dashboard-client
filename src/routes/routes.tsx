import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import BasicInformation from "../pages/BasicInformation";
import AddProject from "../pages/AddProject";
import Blogs from "../pages/Blogs";
import EditProjectContainer from "../pages/EditProjectContainer";
import Experience from "../pages/Experience";
import Login from "../pages/Login";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";

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
        path: "/edit-project/:id",
        element: <EditProjectContainer />,
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
