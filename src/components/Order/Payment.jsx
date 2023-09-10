import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Select,
  message,
  notification,
} from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { doClearBookAction } from "../../redux/order/orderSlice";
import { callCreateAnOrder } from "../../apiService/api";

const Payment = ({ setCurrentStep, totalCarts, carts }) => {
  //   {
  //     "name": "test",
  //     "address": "ha noi",
  //     "phone": "123456789",
  //     "totalPrice": 123,
  //     "detail": [
  //         {
  //             "bookName": "abc",
  //             "quantity": 3,
  //             "_id": "6412cf20dde15982f809c16f"
  //         }
  //         {
  //             "bookName": "asdasd",
  //             "quantity": 4,
  //             "_id": "6412cf20dde15982f809cwsdf"
  //         }
  //     ]

  // }
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const hanldePayment = async (values) => {
    // console.log("Success:", values);
    // console.log("Payment >>> carts:", carts);
    // console.log("Payment >>> totalCarts:", totalCarts);

    let detailOrders = carts.map((cart) => {
      return {
        bookName: `${cart.detail.mainText}`,
        quantity: +cart.quantity,
        _id: `${cart.detail._id}`,
      };
    });
    let rawOrder = {
      name: `${values.name}`,
      address: `${values.address}`,
      phone: `${values.phone}`,
      totalPrice: totalCarts,
      detail: detailOrders,
    };

    console.log("raw >>>: ", rawOrder);
    setIsLoading(true);
    const res = await callCreateAnOrder(rawOrder);
    if (res && res.data) {
      message.success("Đặt hàng thành công !");
      dispatch(doClearBookAction());
      setCurrentStep(2);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsLoading(false);
    // setCurrentStep(2);
    // dispatch(doClearBookAction());
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="order-form">
      <Col span={24}>
        <Form
          name="form-order"
          initialValues={{
            remember: true,
            prefix: "84",
          }}
          onFinish={hanldePayment}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Tên người nhận"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người nhận!",
              },
            ]}
          >
            <Input placeholder="vd: Phương Ngọc" />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui đòng nhập số điện thoại!",
              },
            ]}
          >
            <Input
              addonBefore={
                <>
                  <Form.Item name="prefix" noStyle>
                    <Select
                      style={{
                        width: 70,
                      }}
                    >
                      <Option value="84">+84</Option>
                    </Select>
                  </Form.Item>
                </>
              }
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }} //whole column
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ",
              },
            ]}
          >
            <Input.TextArea
              placeholder="vd: số 9, khóm 9, phường 9 - tp Bạc Liêu"
              showCount
              maxLength={300}
              autoSize={{ minRows: 2, maxRows: 4 }}
              style={{ paddingBottom: "" }}
            />
          </Form.Item>

          <Form.Item label="Hình thức thanh toán" labelCol={{ span: 24 }}>
            <Radio.Group value={"ok"}>
              <Radio value={"ok"}>Thanh toán khi nhận hàng</Radio>
            </Radio.Group>
          </Form.Item>

          <div className="calculate">
            <span> Tổng tiền</span>
            <span className="sum-final">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalCarts)}
            </span>
          </div>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="submit-order"
            >
              Đặt Hàng ({carts.length ?? 0})
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default Payment;
