import React from "react";
import { Drawer, Badge, Descriptions } from "antd";
import moment from "moment/moment";

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
  return (
    <Descriptions size="small" title="Thông tin User" bordered column={2}>
      <Descriptions.Item label="Id">{data._id}</Descriptions.Item>
      <Descriptions.Item label="Tên hiển thị">
        {data.fullName}
      </Descriptions.Item>
      <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
      <Descriptions.Item label="Số điện thoại">{data.phone}</Descriptions.Item>
      <Descriptions.Item span={2} label="Role">
        <Badge status="processing" text={data.role} />
      </Descriptions.Item>
      <Descriptions.Item label="Created At">
        {moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}
      </Descriptions.Item>
      <Descriptions.Item label="Updated At">
        {moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ViewDetailUser;
