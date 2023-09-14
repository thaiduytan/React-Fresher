import { Col, Modal, Row, Tabs } from "antd";
import React from "react";
import UserInfo from "./UserInfo";
import { emitter } from "./emitter";
import ChangePassword from "./ChangePassword";

const ManageAccount = ({ show, setShow }) => {
  const itemsTabs = [
    {
      key: "1",
      label: "Cập nhật thông tin",
      children: <UserInfo></UserInfo>,
    },
    {
      key: "2",
      label: "Đổi mật khẩu",
      children: <ChangePassword></ChangePassword>,
    },
  ];

  const handleCancel = () => {
    setShow(false);
    // call fuc child
    setTimeout(() => {
      emitter.emit(
        "clearAvatarTemp"
      ); /**tham so 1: ten envet,  tham so 2: la` data truyen vao */
    }, 500);
  };
  const hanldeOnChangeTabs = (key) => {
    // console.log(key);
  };
  return (
    <Modal
      title="Quản lý tài khoản"
      open={show}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
      width={"50%"}
    >
      <Row>
        <Col span={24}>
          <Tabs
            defaultActiveKey="1"
            items={itemsTabs}
            onChange={hanldeOnChangeTabs}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ManageAccount;
