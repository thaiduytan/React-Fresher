import React from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { callFetchCategory } from "../../../apiService/api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
const BookModalCreate = ({ show, setShow }) => {
  const [listCategory, setListCategory] = React.useState([]);

  const [loadingThumbnail, setLoadingThumbnail] = React.useState(false);
  const [loadingSlider, setLoadingSlider] = React.useState(false);

  //   const [imageUrl, setImageUrl] = React.useState();

  const [form] = Form.useForm();

  const fethcCategory = async () => {
    const res = await callFetchCategory();
    if (res && res.data) {
      const option = res.data.map((item) => {
        return { label: item, value: item };
      });
      setListCategory(option);
    }
  };

  React.useEffect(() => {
    fethcCategory();
  }, []);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleOk = () => {
    setShow(false);
  };

  const onFinish = (values) => {
    // setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleChange = (info, type) => {
    if (info.file.status === "uploading") {
      type === "slider" ? setLoadingSlider(true) : setLoadingThumbnail(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoadingSlider(false);
        setLoadingThumbnail(false);
        setImageUrl(url);
      });
    }
  };

  const handleUploadFile = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  //   const handleChange = (value) => {
  //     console.log(`selected ${value}`);
  //   };
  return (
    <Modal
      title="Thêm mới book"
      open={show}
      onOk={handleOk}
      onCancel={handleCancel}
      width="50%"
      okText={"Tạo mới"}
      cancelText={"Hủy"}
    >
      <Divider />

      <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
        <Row gutter={15}>
          {/* ten sach */}
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Tên sách"
              name="mainText"
              rules={[
                { required: true, message: "Vui lòng nhập tên hiển thị!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* tac gia */}
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Tác giả"
              name="author"
              rules={[{ required: true, message: "Vui lòng nhập tác giả!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* price */}
          <Col span={6}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Giá tiền"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
            >
              <InputNumber
                min={1000}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                addonAfter="VND"
              />
            </Form.Item>
          </Col>

          {/* THE LOAI */}
          <Col span={6}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Thể loại"
              name="category"
              rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
            >
              <Select
                allowClear
                showSearch
                // mode="tags"
                style={{
                  width: "100%",
                }}
                // onChange={handleChange}
                options={listCategory}
              />
            </Form.Item>
          </Col>

          {/* solong */}
          <Col span={6}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Số lượng"
              name="quantity"
              rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* da ban */}
          <Col span={6}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Đã bán"
              name="sold"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng đã bán!" },
              ]}
              initialValue={0}
            >
              <InputNumber min={0} defaultValue={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* anh thumbnall */}
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Ảnh Thumbnail"
              name="thumbnail"
            >
              <Upload
                name="thumbnail"
                listType="picture-card"
                className="avatar-uploader"
                // showUploadList={false}
                // action=""
                customRequest={handleUploadFile}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                maxCount={1} // Set maxCount to 1 to allow only 1 picture upload
              >
                <div>
                  {loadingThumbnail ? <LoadingOutlined /> : <PlusOutlined />}
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>
          </Col>

          {/* anh slider */}
          <Col span={12}>
            <Form.Item labelCol={{ span: 24 }} label="Ảnh Slider" name="slider">
              <Upload
                name="slider"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                // action=""
                multiple
                customRequest={handleUploadFile}
                beforeUpload={beforeUpload}
                onChange={(info) => handleChange(info, "slider")}
              >
                <div>
                  {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default BookModalCreate;
