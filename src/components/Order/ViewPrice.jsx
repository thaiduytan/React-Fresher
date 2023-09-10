import { Col, Divider } from "antd";
import React from "react";

const ViewPrice = ({ setCurrentStep, totalCarts, carts }) => {
  const handleNextStep = () => {
    if (carts.length > 0) {
      setCurrentStep(1);
    }
    return;
  };
  return (
    <>
      <Col md={8} xs={24}>
        <div className="order-sum">
          <div className="calculate">
            <span> Tạm tính</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalCarts)}
            </span>
          </div>
          <Divider style={{ margin: "10px 0" }} />
          <div className="calculate">
            <span> Tổng tiền</span>
            <span className="sum-final">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalCarts)}
            </span>
          </div>
          <Divider style={{ margin: "10px 0" }} />
          <button onClick={() => handleNextStep()}>
            Mua Hàng ({carts.length ?? 0})
          </button>
        </div>
      </Col>
    </>
  );
};

export default ViewPrice;
