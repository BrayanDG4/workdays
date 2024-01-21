import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { WorkingArea } from "./components/workingArea/WorkingArea.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WorkingArea />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
