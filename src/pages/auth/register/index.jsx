import React from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  message,
  notification,
} from "antd";
import "./index.scss";
import { callRegister } from "../../../apiService/api";
import { Link, useNavigate } from "react-router-dom";
const buttonStyle = {
  margin: "20px", // Đặt giá trị margin cho cả bốn phía (trên, phải, dưới, trái)
};
const validateMessages = {
  required: "${label} không để trống !",
  types: {
    email: "${label} chưa chính xác!",
  },
};
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="84">+84</Option>
    </Select>
  </Form.Item>
);

const RegisterPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  // const [messageApi, contextHolder] = message.useMessage();
  // submit--------------------
  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;
    setIsLoading(true);
    const res = await callRegister(fullName, email, password, phone);
    setIsLoading(false);
    if (res && res.statusCode === 201 && res?.data?._id) {
      // success ------------------------------------------------
      // messageApi.open({
      //   type: "success",
      //   content: "Account registration successful",
      // });
      message.success("Account registration successful");
      navigate("/auth/login");
    } else {
      //  error ------------------------------------------------
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };
  // {contextHolder}
  const onFinishFailed = (errorInfo) => {};
  return (
    <>
      <div className="register-form">
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
              prefix: "84",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
          >
            <div className="heading">
              <h2 className="text text-large">Đăng ký</h2>
              <Divider />
            </div>
            {/* name */}
            <Form.Item
              label="Họ tên"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền Họ và tên !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* email */}
            <Form.Item
              name={"email"}
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
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
                  message: "Vui lòng điền Mật khẩu!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Sô điện thoại"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền số điện thoại!",
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}
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
                Đăng ký
              </Button>
            </Form.Item>

            <p className="text text-normal">
              Đã có tài khoản ?
              <span>
                <Link to="/auth/login"> Đăng Nhập </Link>
              </span>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
