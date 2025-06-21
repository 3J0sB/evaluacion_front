import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddBook from "./pages/AddBook.jsx";
import Booking from "./pages/Booking.jsx";
import ReturnBook from "./pages/ReturnBook.jsx";
import Reader from "./pages/Reader.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import AuthContextProvider from "./store/auth-context.jsx";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/new-book", element: <AddBook /> },
  { path: "/prestamo", element: <Booking /> },
  { path: "/devolucion", element: <ReturnBook /> },
  { path: "/lector", element: <Reader /> },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Login /> },
  { path: "/my-bookings", element: <MyBookings /> }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
