import React from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { callCreateAUser } from "../../../apiService/api";

const ModalCreateUser = ({ show, setShow, fetchUser }) => {
  const [loading, setLoading] = React.useState(false);

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    //  form.getFieldValue(); để get value , kết hợp với forrm của thư viện
    const { email, fullName, password, phone, remember } = form.getFieldValue();
    setLoading(true);
    const res = await callCreateAUser(fullName, password, email, phone);
    if (res && res.data) {
      message.success("Thêm mới thành công!");
      form.resetFields();
      fetchUser();
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setShow(false);
  };
  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        open={show}
        onOk={form.submit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Tạo mới
          </Button>,
        ]}
      >
        <FormCreate form={form} handleSubmit={handleSubmit}></FormCreate>
      </Modal>
    </>
  );
};

const FormCreate = ({ form }) => {
  const validateMessages = {
    required: "Vui lòng nhập ${label} ",
    types: {
      email: "${label} chưa hợp lệ!",
    },
  };
  return (
    <>
      <Form
        form={form}
        name="basic"
        style={{
          maxWidth: "100%",
          padding: "30px 5px 10px 5px",
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        validateMessages={validateMessages}
      >
        {/* name */}
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Tên hiển thị"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên hiển thị!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* passs */}
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* email */}
        <Form.Item
          labelCol={{ span: 24 }} //whole column
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

        {/* sdt */}
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điên thoại!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default ModalCreateUser;
