import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddBook from "./pages/AddBook.jsx";
import Booking from "./pages/Booking.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/new-book", element: <AddBook/>},
  { path: "/prestamo", element: <Booking /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
