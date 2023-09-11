import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Divider, Badge, Drawer, message, Avatar, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router";
import "./Header.scss";
import { callLogOut } from "../../apiService/api";
import { doLogOutAccount_cachMot } from "../../redux/account/accountSlice";
import { Link } from "react-router-dom";
import ManageAccount from "../ManageAccount/ManageAccount";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalManageAccount, setOpenModalManageAccount] = useState(false);

  const carts = useSelector((state) => state.order.carts);

  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;
  // console.log(user);

  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substring(0, maxLength) + "...";
    }
  }

  const handleLogout = async () => {
    const res = await callLogOut();

    if (res && res.data) {
      // dọn sạch reddux state
      dispatch(doLogOutAccount_cachMot());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  const contentPopover = () => {
    return (
      <>
        <div className="popcart-body">
          <div className="popcart-content">
            {carts.map((cart) => {
              return (
                <div className="popcart-book">
                  <div className="popcart-img">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                        cart?.detail?.thumbnail
                      }`}
                      alt={cart?.detail?.mainText}
                    />
                  </div>
                  <div>{truncateString(cart?.detail?.mainText, 50)}</div>
                  <div style={{ paddingLeft: "10px", color: "red" }}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(cart?.detail?.price)}
                  </div>
                </div>
              );
            })}
          </div>
          {carts.length > 0 ? (
            <div className="popcart-footer">
              <button
                className="popcart-check"
                onClick={() => navigate("/order")}
              >
                Xem giỏ hàng
              </button>
            </div>
          ) : (
            <div className="popcart-footer">
              Bạn không có sản phẩm trong giỏ hàng
            </div>
          )}
        </div>
      </>
    );
  };

  let items = [
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
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];
  if (user?.role === "ADMIN") {
    items.unshift({
      label: (
        <label style={{ cursor: "pointer" }}>
          <Link style={{ color: "inherit" }} to="/admin">
            Trang quản trị
          </Link>
        </label>
      ),
      key: "admin",
    });
  }
  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__left">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <span className="logo" onClick={() => navigate("/")}>
                <FaReact className="rotate icon-react" /> Duy Tanzz
                <VscSearchFuzzy className="icon-search" />
              </span>
              <input
                className="input-search"
                type={"text"}
                placeholder="Bạn tìm gì hôm nay"
              />
            </div>
          </div>
          <nav className="page-header__right">
            <ul id="navigation" className="navigation">
              <li className="navigation__item">
                <Popover
                  className="popsover-carts"
                  rootClassName="popsover-carts"
                  placement="bottomRight"
                  title={
                    <span style={{ fontSize: "13px" }}>Sản phẩm mới thêm</span>
                  }
                  content={contentPopover}
                  arrow={true}
                >
                  <Badge count={carts?.length ?? 0} size={"small"} showZero>
                    <FiShoppingCart className="icon-cart" />
                  </Badge>
                </Popover>
              </li>

              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/auth/login")}>Tài Khoản</span>
                ) : (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Avatar src={urlAvatar} />
                        Welcome {user?.fullName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        {isAuthenticated ? (
          <>
            <p>Quản lý tài khoản</p>
            <Divider />
            <p onClick={() => handleLogout()}>Đăng xuất</p>
            <Divider />
          </>
        ) : (
          <>
            <Divider />
            <p onClick={() => navigate("/auth/login")}>Đăng nhập</p>
            <Divider />
          </>
        )}
      </Drawer>
      <ManageAccount
        show={openModalManageAccount}
        setShow={setOpenModalManageAccount}
      />
    </>
  );
};

export default Header;
