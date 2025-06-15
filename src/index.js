import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddBook from "./pages/AddBook.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {path: "/new-book", element: <AddBook/>}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
