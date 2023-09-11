import { Modal } from "antd";
import React from "react";

const ManageAccount = ({show,setShow}) => {
  const handleOk = () => {
    show(false);
  };
  const handleCancel = () => {
    show(false);
  };
  return (
    <Modal
      title="Basic Modal"
      open={show}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ManageAccount;
