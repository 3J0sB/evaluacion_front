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
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import Register from "./pages/Register.jsx";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/new-book",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <AddBook />
      </ProtectedRoute>
    ),
  },
  {
    path: "/prestamo",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Booking />
      </ProtectedRoute>
    ),
  },
  {
    path: "/devolucion",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <ReturnBook />
      </ProtectedRoute>
    ),
  },
  {
    path: "/lector",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Reader />
      </ProtectedRoute>
    ),
  },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/my-bookings",
    element: (
      <ProtectedRoute allowedRoles={["USER"]}>
        <MyBookings />
      </ProtectedRoute>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
