import React from "react";
import { Button, Form, Input, Modal, message, notification } from "antd";
import { callUpdateUser } from "../../../apiService/api";

const ModalUpdateUserLvEasy = ({ show, setShow, fetchUser, data }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  //   const handleUpdateUser = () => {
  //     console.log(data);
  //   };
  const handleSubmit = async (values) => {
    const { _id, fullName, phone } = form.getFieldValue();
    setLoading(true);
    const res = await callUpdateUser(_id, fullName, phone);
    if (res && res.data) {
      message.success("Cập nhật Usser thành công");
      setShow(false);
      fetchUser();
    } else {
      notification({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  React.useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <>
      <Modal
        title="Cập nhật người dùng"
        open={show}
        // onOk={form.submit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            form="formUpdateUser"
            key="submit"
            type="primary"
            loading={loading}
            onClick={form.submit}
          >
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          name="formUpdateUser"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          style={{
            padding: "30px 5px 15px 5px",
          }}
        >
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Tên hiển thị"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Vui lòng điền Tên hiển thị!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }} //whole column
            disabled
            name={"email"}
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input disabled={true} />
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
      </Modal>
    </>
  );
};

export default ModalUpdateUserLvEasy;
