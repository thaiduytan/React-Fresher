import React from "react";
import { Button, Col, Form, Input, Row } from "antd";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} chưa đúng đinh dạng!",
  },
};

const AdvancedSearchForm = ({ handleSearch }) => {
  const [form] = Form.useForm();
  // const [dataQuerySearch, setDataQuerySearch] = React.useState("");
  const onFinish = (values) => {
    // setDataSearch(values);
    let queryString = "";
    if (values) {
      // console.log("fetchUser >>> values:", values);
      if (values.fullName) {
        queryString += `&fullName=/${values.fullName}/i`;
      }
      if (values.email) {
        queryString += `&email=/${values.email}/i`;
      }
      if (values.phone) {
        queryString += `&phone=/${values.phone}/i`;
      }
      // setDataQuerySearch(querySearch);
    }
    handleSearch(queryString);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        form={form}
        name="basic"
        initialValues={{
          remember: true,
        }}
        validateMessages={validateMessages}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={24}>
          <Col span={8}>
            {/* fullname */}
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Name"
              name="fullName"
              rules={[
                {
                  //   message: "username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* email */}
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              name={"email"}
              label="Email"
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/*sdt  */}
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  // required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24} style={{ textAlign: "right" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button
                style={{ margin: "0 8px" }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                Clear
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const InputSearch = ({ handleSearch }) => {
  return (
    <>
      <AdvancedSearchForm handleSearch={handleSearch}></AdvancedSearchForm>
    </>
  );
};

export default InputSearch;
