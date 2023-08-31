import React from "react";
import { Drawer, Badge, Descriptions, Divider, Upload, Modal } from "antd";
import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";

const ViewDetailUser = ({ show, setShow, data }) => {
  const onClose = () => {
    setShow(false);
  };
  return (
    <>
      <Drawer
        title="Chức năng xem chi tiết"
        placement="right"
        onClose={onClose}
        open={show}
        size={"large"}
      >
        <TableViewDetail data={data}></TableViewDetail>
      </Drawer>
    </>
  );
};

const TableViewDetail = ({ data }) => {
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");
  const [fileList, setFileList] = React.useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-2",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-3",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-4",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);

  //   const [listThumb, setListThumb] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      let listThumb = [...data.slider, data.thumbnail];
      let result = listThumb.map((item) => {
        return {
          uid: uuidv4(),
          name: `ImagePreview-${item}`,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        };
      });
      setFileList(result);
    }
  }, [data]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  //   console.log(previewImage);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  return (
    <>
      <Descriptions
        size="large"
        title={<h3 style={{ fontWeight: "bold" }}>Thông tin Book</h3>}
        bordered
        column={2}
      >
        <Descriptions.Item label="Id">{data?._id}</Descriptions.Item>

        <Descriptions.Item label="Tên sách">{data?.mainText}</Descriptions.Item>

        <Descriptions.Item label="Tác giả">{data?.author}</Descriptions.Item>

        <Descriptions.Item label="Giá tiền">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(data?.price)}
        </Descriptions.Item>

        <Descriptions.Item label="Số lượng">{data?.quantity}</Descriptions.Item>

        <Descriptions.Item label="Đã bán">{data?.sold}</Descriptions.Item>

        <Descriptions.Item span={2} label="Thể loại">
          <Badge status="processing" text={data?.category} />
        </Descriptions.Item>

        <Descriptions.Item label="Created At">
          {moment(data?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        </Descriptions.Item>

        <Descriptions.Item label="Updated At">
          {moment(data?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Ảnh Book</Divider>

      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        showUploadList={{ showRemoveIcon: false }}
      ></Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
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

export default ViewDetailUser;
