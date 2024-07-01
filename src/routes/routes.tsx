import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BasicInformation from "../pages/BasicInformation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <BasicInformation />,
      },
    ],
  },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/register",
  //     element: <Register />,
  //   },
]);

export default router;
