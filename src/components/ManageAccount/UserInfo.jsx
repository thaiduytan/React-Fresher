import React from "react";
import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  message,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callUpdateInfo, callUploadAvatar } from "../../apiService/api";
import {
  doUpdateUserInfo,
  doUploadAvatarAction,
} from "../../redux/account/accountSlice";
import { emitter } from "./emitter";
import { useRef } from "react";
const UserInfo = (props) => {
  const dispatch = useDispatch();
  const buttonUpload = useRef(null);
  const avatar = useSelector((state) => state.account.user.avatar);

  const userID = useSelector((state) => state.account.user.id);
  const user = useSelector((state) => state.account.user);

  const [userAvatar, setUserAvatar] = React.useState(avatar);
  const [isloading, setIsloading] = React.useState(false);

  React.useEffect(() => {
    emitter.on("clearAvatarTemp", () => {
      fireClearAvatarTemp();
    });
  }, [avatar]);
  const fireClearAvatarTemp = () => {
    setUserAvatar(avatar);
  };
  const handleUploadAvartar = async ({ file, onSuccess }) => {
    const res = await callUploadAvatar(file);
    if (res && res.data) {
      const newAvatar = res.data.fileUploaded;
      dispatch(doUploadAvatarAction({ avatar: newAvatar }));
      setUserAvatar(newAvatar);
    }
    onSuccess("ok");
  };
  const propsUpload = {
    maxCount: 1,
    multiple: false,
    showUploadList: false,
    customRequest: handleUploadAvartar,
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`Avatar đã được upload`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const hanldeFinishUpdate = async (values) => {
    const { fullName, phone } = values;
    setIsloading(true);
    const res = await callUpdateInfo(fullName, phone, userAvatar, userID);
    if (res && res.data) {
      dispatch(doUpdateUserInfo({ avatar: userAvatar, phone, fullName }));
      message.success("Cập nhật thông tin User thành công");
      localStorage.removeItem("access_token");
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
    <>
      <div style={{ minHeight: 400 }}>
        <Row>
          <Col sm={24} md={12}>
            <Row gutter={[30, 30]}>
              {/* avatar */}
              <Col span={24}>
                <Avatar
                  style={{ cursor: "pointer" }}
                  onClick={(e) => buttonUpload.current.click()}
                  size={{ xs: 70, sm: 80, md: 100, lg: 150, xl: 200 }}
                  icon={<AntDesignOutlined />}
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/images/avatar/${userAvatar}`}
                  shape="circle"
                />
              </Col>

              {/* upLoad */}
              <Col span={24}>
                <Upload {...propsUpload}>
                  <Button ref={buttonUpload} icon={<UploadOutlined />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Col>
            </Row>
          </Col>
          <Col sm={24} md={12}>
            <Form
              name="basic"
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
              >
                <Input disabled={true} />
              </Form.Item>

              {/* fullName */}
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên hiển thị"
                name="fullName"
                initialValue={user?.fullName}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhâp tên hiển thị!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* fullName */}
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số điện thoại"
                name="phone"
                initialValue={user?.phone}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isloading}>
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserInfo;
