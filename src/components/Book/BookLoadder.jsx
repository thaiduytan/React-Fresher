import { Col, Divider, Row, Skeleton, Space } from "antd";
import React from "react";

const BookLoadder = () => {
  return (
    <Row gutter={[20, 20]}>
      <Col md={10} sm={0} xs={0}>
        <Skeleton.Input
          active
          block={true}
          style={{ width: "100%", height: "350px" }}
        />
        <Row
          justify="center"
          gutter={[30, 30]}
          style={{ paddingTop: "15px", overflow: "hidden" }}
        >
          <Col>
            <Skeleton.Image active />
          </Col>
          <Col>
            <Skeleton.Image active />
          </Col>
          <Col>
            <Skeleton.Image active />
          </Col>
        </Row>
      </Col>
      <Col md={14} sm={24}>
        <div style={{ paddingBottom: "30px" }}>
          <Skeleton active />
        </div>
        <div style={{ paddingBottom: "30px" }}>
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
        <div style={{ paddingBottom: "30px" }}>
          <Skeleton.Input
            active
            size={"small"}
            block={false}
            style={{ marginRight: "20px" }}
          />
          <Skeleton.Input active size={"small"} block={false} />
        </div>
      </Col>
    </Row>
  );
};

export default BookLoadder;
