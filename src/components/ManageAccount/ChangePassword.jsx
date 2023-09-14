import { Button, Col, Form, Input, Row, message, notification } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { callChangePassword } from "../../apiService/api";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.account.user);
  const [isloading, setIsloading] = React.useState(false);

  const hanldeFinishUpdate = async (values) => {
    const { email, oldpass, newpass } = values;
    setIsloading(true);
    const res = await callChangePassword(email, oldpass, newpass);
    if (res && res.data) {
      message.success("Cập nhật mật khẩu thành công");
      form.setFieldValue("oldpass", "");
      form.setFieldValue("newpass", "");
      form.setFieldValue("newpassConfirm", "");

    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsloading(false);
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <Row>
      <Col span={13} push={1}>
        <Form
          form={form}
          name="dependencies"
          initialValues={{
            remember: true,
          }}
          onFinish={hanldeFinishUpdate}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Email */}
          <Form.Item
            labelCol={{ span: 24 }}
            label="Email"
            name="email"
            initialValue={user?.email}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Mật khẩu hiện tại"
            name="oldpass"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu hiện tại!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Mật khẩu mới"
            name="newpass"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Field */}
          <Form.Item
            labelCol={{ span: 24 }}
            label="Xác nhận mật khẩu"
            name="newpassConfirm"
            dependencies={["newpass"]}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newpass") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isloading}>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ChangePassword;
