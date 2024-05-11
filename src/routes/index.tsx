import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AllContact from "../pages/AllContact";
import AddContact from "../pages/AddContact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <AllContact></AllContact>,
      },
      {
        path: "/add-contact",
        element: <AddContact></AddContact>,
      },
    ],
  },
]);
