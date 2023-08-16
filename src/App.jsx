import React from "react";
import "./App.scss"
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";

// react router dom import Const and Page
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import BookPage from "./pages/book";
import ContactPage from "./pages/contact";

// react router dom import  auth ( login / register )
import AuthPage from "./pages/auth";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";

// chuyển component layput leen thành compoent Main,
const Layout = () => {
  return (
    <div className="layput-page">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

// giao cho component App bọc RouterProvider, chứ không làm như thư viện RouterProvider bọc APP
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 Not Found</div>,

      // các children sử dụng chung 1 component header và footer thông qua outlet
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthPage />,
      errorElement: <div>404 Not Found</div>,

      // các children sử dụng chung 1 component header và footer thông qua outlet
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
