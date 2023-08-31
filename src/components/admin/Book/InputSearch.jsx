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

    // console.log("onFinish >>> values:", values);

    // setDataSearch(values);
    
    let queryString = "";
    if (values) {
      // console.log("fetchUser >>> values:", values);
      if (values.mainText) {
        queryString += `&mainText=/${values.mainText}/i`;
      }
      if (values.author) {
        queryString += `&author=/${values.author}/i`;
      }
      if (values.category) {
        queryString += `&category=/${values.category}/i`;
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
            {/* Teen sach */}
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Tên sách"
              name="mainText"
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
            {/* tác giả */}
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              name={"author"}
              label="Tác giả"
              rules={[{}]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/*sdt  */}
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Thể loại"
              name="category"
              rules={[
                {
                  // required: true,
                  message: "Please input your category!",
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
