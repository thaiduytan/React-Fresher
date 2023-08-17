import React from "react";
import { Button, Divider, Form, Input, message, notification } from "antd";
import "./index.scss";
import { callLogin } from "../../../apiService/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../../redux/account/accountSlice";
const buttonStyle = {
  margin: "20px", // Đặt giá trị margin cho cả bốn phía (trên, phải, dưới, trái)
};
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const onFinish = async (values) => {
    const { username, password } = values;
    setIsLoading(true);
    const res = await callLogin(username, password, 3000);
    setIsLoading(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      message.success("Account login successful!");
      navigate("/");
    } else {
      notification.error({
        message: "Error:",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <>
      <div className="login-form">
        <div className="form-container">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 500,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="heading">
              <h2 className="text text-large">Đăng nhập</h2>
              <Divider />
            </div>
            {/* username */}
            <Form.Item
              label="Email"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền Email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* paswword */}
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền Mật khẩu !",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                style={buttonStyle}
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <Divider>Or</Divider>
            <p className="text text-normal">
              Chưa có tài khoản ?
              <span>
                <Link to="/auth/register"> Đăng Ký </Link>
              </span>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
