import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import React from "react";

const ResultOrder = () => {
  return (
    <>
      <Result
        icon={<SmileOutlined />}
        title="Đơn hàng đã được đặt thành công"
        extra={<Button type="primary">Xem lịch sử</Button>}
      ></Result>
    </>
  );
};

export default ResultOrder;
