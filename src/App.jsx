import React from "react";
import "./App.scss";

import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Home from "./components/Home/index";

// react router dom import Const and Page
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import BookPage from "./pages/book";
import ContactPage from "./pages/contact";

// react router dom import  auth ( login / register )
import AuthPage from "./pages/auth";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";
import { callFetchAccount } from "./apiService/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";

// React Router 6: Private Routes : bảo vệ route khi chưa đăng nhập
import ProtectedRoute from "./components/protectedRoute";
import Loading from "./components/loading";
import NotFound from "./components/notFound";
import AdminPage from "./pages/admin";
import LayoutAdmin from "./components/admin/LayoutAdmin";
import UserTable from "./components/admin/User/UserTable";
import BookTable from "./components/admin/Book/BookTable";

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
// const LayoutAdmin = () => {
//   // logic check kiểm tra user/admin hay không ?
//   const isAdminRole = window.location.pathname.startsWith("/admin");
//   const user = useSelector((state) => state.account.user);
//   const userRole = user.role;

//   return (
//     <div className="layput-page">
//       {isAdminRole && userRole === "ADMIN" && <Header />}
//       <Outlet></Outlet>
//       {isAdminRole && userRole === "ADMIN" && <Footer />}
//     </div>
//   );
// };

// giao cho component App bọc RouterProvider, chứ không làm như thư viện RouterProvider bọc APP
export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);
  // func fetch lại account và chuyền ngược lại cho reddux
  const getAccount = async () => {
    // không gọi api khi log vào page login, register, home
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/auth/login" ||
      window.location.pathname === "/auth/register"
    ) {
      return;
    }
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };
  React.useEffect(() => {
    setTimeout(() => {
      getAccount();
    }, 1000);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound></NotFound>,

      // các children sử dụng chung 1 component header và footer thông qua outlet
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book/:slug",
          element: <BookPage />,
        },
      ],
    },

    // admin
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound></NotFound>,

      // các children sử dụng chung 1 component header và footer thông qua outlet
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: (
            <ProtectedRoute>
              <UserTable />
            </ProtectedRoute>
          ),
        },
        {
          path: "book",
          element: (
            <ProtectedRoute>
              <BookTable />
            </ProtectedRoute>
          ),
        },
      ],
    },

    // auth
    {
      path: "/auth",
      element: <AuthPage />,
      errorElement: <NotFound></NotFound>,

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
      {isLoading === false ||
      window.location.pathname === "/auth/login" ||
      window.location.pathname === "/auth/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
