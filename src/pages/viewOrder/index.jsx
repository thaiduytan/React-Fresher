import React from "react";
import {
  Button,
  Col,
  Empty,
  InputNumber,
  Popconfirm,
  Result,
  Row,
  Steps,
} from "antd";
import "./order.scss";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  doAddQuantity,
  doRemoveBookAction,
} from "../../redux/order/orderSlice";
import ViewPrice from "../../components/Order/ViewPrice";
import Payment from "../../components/Order/Payment";
import { useNavigate } from "react-router-dom";

const ViewOrder = (props) => {
  const carts = useSelector((state) => state.order.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalCarts, setTotalCarts] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState(0);

  const calculateTotal = () => {
    let total = 0;
    carts.forEach((cart) => {
      total += cart?.quantity * cart?.detail?.price;
    });
    setTotalCarts(total);
  };
  const totalCart = (price, quantity) => {
    let total = +price * +quantity;
    return total;
  };
  React.useEffect(() => {
    calculateTotal();
  }, [carts]);

  const hanldeChangeNumber = (value, _id) => {
    if (!value || value < 1) return;
    dispatch(doAddQuantity({ quantity: +value, _id: _id }));
  };
  const hanldeDeleteCart = (_id) => {
    // console.log("hanldeDeleteCart >>> _id:", _id);
    dispatch(doRemoveBookAction(_id));
  };

  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div
        className="order-container"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        <Row>
          <Col span={24} className="order-steps">
            <Steps
              size="small"
              current={currentStep}
              items={[
                {
                  title: "Đơn hàng",
                },
                {
                  title: "Đặt hàng",
                },
                {
                  title: "Thanh toán",
                },
              ]}
            />
          </Col>
        </Row>
        {currentStep !== 2 && (
          <Row gutter={[20, 20]}>
            <Col md={16} xs={24}>
              {carts &&
                carts.length > 0 &&
                carts.map((book, index) => (
                  <div className="order-book" key={index}>
                    <div className="book-content">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                          book?.detail?.thumbnail
                        }`}
                        alt={book?.detail?.mainText}
                      />
                      <div className="title">{book?.detail?.mainText}</div>
                      <div className="price">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(book?.detail?.price)}
                      </div>
                    </div>
                    <div className="action">
                      <div className="quantity">
                        <InputNumber
                          value={book?.quantity}
                          onChange={(value) =>
                            hanldeChangeNumber(value, book?._id)
                          }
                          min={0}
                        />
                      </div>
                      <div className="sum">
                        <span style={{ marginRight: "10px" }}>Tổng:</span>

                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          totalCart(+book?.detail?.price, book?.quantity)
                        )}
                      </div>
                      <Popconfirm
                        title="Xóa"
                        description="Bạn có muốn khỏi giỏ hàng không ?"
                        onConfirm={() => hanldeDeleteCart(book?._id)}
                        // onCancel={cancel}
                        okText="Xóa"
                        cancelText="Hủy"
                        icon={
                          <QuestionCircleOutlined style={{ color: "red" }} />
                        }
                      >
                        <DeleteOutlined className="delete" />
                      </Popconfirm>
                    </div>
                  </div>
                ))}
              {carts && carts.length === 0 && (
                <div style={{ width: "100%", height: "100%" }}>
                  <Empty description={"Không có sản phẩm trong giỏ hàng"} />
                </div>
              )}
            </Col>
            {currentStep === 0 && (
              <ViewPrice
                setCurrentStep={setCurrentStep}
                totalCarts={totalCarts}
                carts={carts}
              />
            )}

            {currentStep === 1 && (
              <Payment
                setCurrentStep={setCurrentStep}
                totalCarts={totalCarts}
                carts={carts}
              ></Payment>
            )}
          </Row>
        )}
        {currentStep === 2 && (
          <Result
            icon={<SmileOutlined />}
            title="Đơn hàng đã được đặt thành công"
            extra={
              <Button onClick={() => navigate("/history")} type="primary">
                Xem lịch sử
              </Button>
            }
          ></Result>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
