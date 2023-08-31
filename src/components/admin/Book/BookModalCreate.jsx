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
  message,
  notification,
} from "antd";
import {
  callCreateABook,
  callFetchCategory,
  callUploadImageBook,
} from "../../../apiService/api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
const BookModalCreate = ({ show, setShow, fetchBook }) => {
  const [listCategory, setListCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [loadingThumbnail, setLoadingThumbnail] = React.useState(false);
  const [loadingSlider, setLoadingSlider] = React.useState(false);
  const [dataThumbNail, setDataThumbNail] = React.useState([]);
  const [dataSlider, setDataSlider] = React.useState([]);

  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState();

  const [form] = Form.useForm();

  // phần fetching ====================================================================================
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

  // Phần sửa lại func thư viện =================================================================================
  const onFinish = async (values) => {
    console.log(values);

    console.log("BookModalCreate >>> dataThumbNail:", dataThumbNail);

    console.log("BookModalCreate >>> dataSlider:", dataSlider);

    // validate
    if (dataThumbNail && dataThumbNail.length === 0) {
      notification.error({
        message: "Lỗi validate",
        description: "Vui lòng upload ảnh Thumbnail",
      });
      return;
    }
    if (dataSlider && dataSlider.length === 0) {
      notification.error({
        message: "Lỗi validate",
        description: "Vui lòng upload ảnh Slider",
      });
      return;
    }

    const { mainText, author, price, sold, quantity, category } = values;
    const thumbNail = dataThumbNail[0].name;
    const slider = dataSlider.map((img) => {
      return img.name;
    });

    setLoading(true);
    const res = await callCreateABook(
      thumbNail,
      slider,
      mainText,
      author,
      price,
      sold,
      quantity,
      category
    );

    if (res && res.data) {
      message.success("Tạo mới book thành công");
      form.resetFields();
      setDataSlider([]);
      setDataThumbNail([]);
      setShow(false);
      fetchBook();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setLoading(false);
    // setShow(false);
  };
  const handleCancel = () => {
    setShow(false);
    form.resetFields();
    setDataThumbNail([]);
    setDataSlider([]);
  };
  // xu ly file thumbnal
  const handleUploadFileThumbnall = async ({ file, onSuccess, onError }) => {
    // console.log("handleUploadFileThumbnall >>> file:", file);
    const res = await callUploadImageBook(file);
    if (res && res.data) {
      setDataThumbNail([
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
    }
    onSuccess("ok");
  };
  // xu ly file thumbnal
  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
    // console.log("handleUploadFileSlider >>> file:", file);
    const res = await callUploadImageBook(file);
    if (res && res.data) {
      setDataSlider((dataSlide) => [
        ...dataSlide,
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
    }
    onSuccess("ok");
  };
  // xử lý data khi xóa ảnh preview
  const hanldeRemovePreviewImg = (file, type) => {
    if (type === "slider") {
      let arrNewData = [];
      arrNewData = dataSlider.filter((item) => item.uid != file.uid);
      setDataSlider(arrNewData);
    } else {
      setDataThumbNail([]);
    }
  };

  // phần thư viện========================================================================================
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
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
  const hanldeGetBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await hanldeGetBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  return (
    <>
      <Modal
        title="Thêm mới book"
        open={show}
        onOk={form.submit}
        onCancel={handleCancel}
        width="50%"
        cancelText={"Hủy"}
        okText={loading ? "Đang tạo mới" : "Tạo mới"}
        confirmLoading={loading} // Confirm loading để hiển thị biểu tượng loading trên nút OK
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
                <InputNumber
                  min={0}
                  defaultValue={0}
                  style={{ width: "100%" }}
                />
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
                  customRequest={handleUploadFileThumbnall}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  maxCount={1} // Set maxCount to 1 to allow only 1 picture upload
                  onPreview={handlePreview}
                  onRemove={(file) => hanldeRemovePreviewImg(file)}
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
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Slider"
                name="slider"
              >
                <Upload
                  name="slider"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={true}
                  // action=""
                  multiple
                  customRequest={handleUploadFileSlider}
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, "slider")}
                  onPreview={handlePreview}
                  onRemove={(file) => hanldeRemovePreviewImg(file, "slider")}
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
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default BookModalCreate;
