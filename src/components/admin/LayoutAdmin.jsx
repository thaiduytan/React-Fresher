import React, { useState } from "react";
import "./LayoutAdmin.scss";
import {
  AppstoreOutlined,
  DollarCircleOutlined,
  DownOutlined,
  ExceptionOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, Space, message, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogOutAccount_cachHai } from "../../redux/account/accountSlice";
import ManageAccount from "../ManageAccount/ManageAccount";
const { Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
const itemsNav = [
  {
    label: <Link to="/admin">Dashboard</Link>,
    key: "dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    label: <span>Manage Users</span>,
    key: "user",
    icon: <UserOutlined />,
    children: [
      {
        label: <Link to="/admin/user">CRUD</Link>,
        key: "crud",
        icon: <TeamOutlined />,
      },
      {
        label: "Files1",
        key: "file1",
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    label: <Link to="/admin/book">Manage Books</Link>,
    key: "book",
    icon: <ExceptionOutlined />,
  },
];
const LayoutAdmin = () => {
  const user = useSelector((state) => state.account.user);
  const [openModalManageAccount, setOpenModalManageAccount] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);

  React.useEffect(() => {
    if (window.location.pathname.includes("/book")) {
      setActiveMenu("book");
    }
    if (window.location.pathname.includes("/admin/user")) {
      setActiveMenu("crud");
    }
  }, []);

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;

  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    // logout cach 1: call api truc tiep
    // const res = await callLogOut();
    // if (res && res.data) {
    //   // dọn sạch reddux state
    //   dispatch(doLogOutAccount());
    //   message.success("Đăng xuất thành công");
    //   navigate("/");
    // }

    // logout cach 2, dung redux thunk
    // dọn sạch reddux state
    dispatch(doLogOutAccount_cachHai());
    // message.success("Đăng xuất thành công");
    // navigate("/");
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const itemsDrop = [
    {
      label: (
        <label style={{ cursor: "pointer" }}>
          <Link style={{ color: "inherit" }} to="/">
            Trang chủ
          </Link>
        </label>
      ),
      key: "home",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }}>
          <span onClick={() => setOpenModalManageAccount(true)}>
            Quản lý tài khoản
          </span>
        </label>
      ),
      key: "account",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }}>
          <Link style={{ color: "inherit" }} to="/history">
            Lịch sử mua hàng
          </Link>
        </label>
      ),
      key: "history",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          <span> Đăng xuất</span>
        </label>
      ),
      key: "logout",
    },
  ];
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
        className="layout-admin"
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <div className="layout-admin__logo">ADMIN</div>
          <Menu
            theme="light"
            // defaultSelectedKeys={["1"]}
            selectedKeys={[activeMenu]}
            mode="inline"
            items={itemsNav}
            onClick={(e) => {
              setActiveMenu(e.key);
            }}
          />
        </Sider>
        <Layout>
          <div className="layout-admin__header">
            <span>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </span>
            <Dropdown menu={{ items: itemsDrop }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar src={urlAvatar} />
                  <span> Welcome {user?.fullName}</span>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            <div>Đại học Bạc liêu React&copy; by DuyTanzz</div>
          </Footer>
        </Layout>
      </Layout>
      <ManageAccount
        show={openModalManageAccount}
        setShow={setOpenModalManageAccount}
      />
    </>
  );
};

export default LayoutAdmin;
