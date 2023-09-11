import { Col, Row } from "antd";
import React from "react";
import HistoryTable from "../../components/History/HistoryTable";
import "./History.scss";

const History = () => {
  return (
    <div
      className="history-container"
      style={{ maxWidth: 1440, margin: "0 auto", padding: "20px 0" }}
    >
      <Row className="history-header">
        <Col span={24}>Lịch sử đặt hàng</Col>
      </Row>
      <Row className="history-content">
        <Col span={24}>
          <HistoryTable />
        </Col>
      </Row>
    </div>
  );
};

export default History;
