import { ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, notification } from "antd";
import React from "react";
import { callGetDashboard } from "../../../apiService/api";
import CountUp from "react-countup";

const DashBoard = () => {
  const [listDashboard, setListDashboard] = React.useState({});
  const formatter = (value) => <CountUp end={value} separator="," />;
  // "countOrder": 8,
  // "countUser": 32
  const fetchDashboard = async () => {
    const res = await callGetDashboard();
    if (res && res?.data) {
      setListDashboard(res?.data);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  React.useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <div className="dash_board_container">
      <Row gutter={[30, 30]}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Số lượng đơn hàng"
              formatter={formatter}
              value={listDashboard?.countOrder}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Số lượng Users"
              value={listDashboard?.countUser}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
