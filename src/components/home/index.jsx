import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  InputNumber,
  Pagination,
  Rate,
  Row,
  Spin,
  Tabs,
} from "antd";
import React from "react";
import "./Home.scss";
import {
  callFetchCategory,
  callFetchListBookWithPaginate,
} from "../../apiService/api";
const Home = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = React.useState(false);
  const [total, setTotal] = React.useState(10);
  const [current, setCurrent] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);

  const [listCategory, setListCategory] = React.useState([]);

  const [listBook, setListBook] = React.useState([]);
  const [sortQuery, setSortQuery] = React.useState(`sort=-sold`);
  const [categoryQuery, setCategoryQuery] = React.useState("");
  const [priceQuery, setPriceQuery] = React.useState("");
  // console.log("Home >>> listBook:", listBook);

  const fetchListCategory = async () => {
    const res = await callFetchCategory();
    if (res && res.data) {
      const result = res.data.map((item) => {
        return {
          value: item,
          label: item,
        };
      });
      setListCategory(result);
    }
  };
  // list category
  React.useEffect(() => {
    fetchListCategory();
  }, []);

  const fetchListBookWithPaginate = async () => {
    let query = `current=${+current}&pageSize=${+pageSize}`;

    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    if (categoryQuery) {
      query += `&${categoryQuery}`;
    }

    if (priceQuery) {
      query += `&${priceQuery}`;
    }

    setIsLoading(true);
    const res = await callFetchListBookWithPaginate(query);
    if (res && res.data) {
      setListBook(res?.data?.result);
      setTotal(res?.data?.meta?.total);
    }
    setIsLoading(false);
  };
  // list p[aginate
  React.useEffect(() => {
    fetchListBookWithPaginate();
  }, [current, pageSize, sortQuery, categoryQuery, priceQuery]);

  const onFinish = (values) => {
    // console.log(values);
    if (values?.range?.from && values?.range?.to) {
      let stringRange = `price>=${values?.range?.from}&price<=${values?.range?.to}`;
      // if (values?.category) {
      //   stringRange += `&category=${values?.category.join(",")}`;
      // }
      setPriceQuery(stringRange);
    } else {
      setPriceQuery("");
    }
  };
  const onChangePagination = (pagination) => {
    console.log("onChangePagination >>> pagination:", pagination);
    if (pagination && pagination.page !== +current) {
      setCurrent(pagination.page);
      setPageSize(pagination.pageSizeL);
    }
    if (pagination && pagination.pageSizeL !== +pageSize) {
      setPageSize(pagination.pageSizeL);
      setCurrent(1);
    }
  };
  const onValuesChangeFillter = (changedValues, values) => {
    // console.log("onValuesChangeFillter >>> values:", values);
    // console.log("onValuesChangeFillter >>> changedValues:", changedValues);

    let arrCategory = values.category;
    // fire only values.category changes
    if (values.category && values.category.length > 0) {
      let stringCategory = arrCategory.join(",");
      setCategoryQuery(`category=${stringCategory}`);
    } else {
      // reset
      setCategoryQuery("");
    }
  };
  // const onChangeTabs = (key) => {
  //   console.log();
  //   switch (key) {
  //     case "1": {
  //       setSortQuery(`sort=-sold`);
  //       break;
  //     }
  //     case "2": {
  //       setSortQuery(`sort=-updatedAt`);
  //       break;
  //     }
  //     case "3": {
  //       setSortQuery(`sort=price`);
  //       break;
  //     }
  //     case "4": {
  //       setSortQuery(`sort=-price`);
  //       break;
  //     }

  //     default:
  //       break;
  //   }
  // };
  const items = [
    {
      key: "sort=-sold",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "sort=-updatedAt",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "sort=price",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "sort=-price",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];
  return (
    <>
      <div
        className="homepage-container"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        <Row gutter={[20, 20]}>
          <Col md={4} sm={0} xs={0} style={{ border: "1px solid green" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>
                <FilterTwoTone /> Bộ lọc tìm kiếm
              </span>
              <ReloadOutlined
                title="Reset"
                onClick={() => form.resetFields()}
              />
            </div>
            <Form
              onFinish={onFinish}
              form={form}
              onValuesChange={onValuesChangeFillter}
            >
              <Form.Item
                name="category"
                label="Danh mục sản phẩm"
                labelCol={{ span: 24 }}
              >
                <Checkbox.Group>
                  <Row>
                    {listCategory &&
                      listCategory.length > 0 &&
                      listCategory.map((category, index) => {
                        return (
                          <Col
                            span={24}
                            style={{ marginBottom: "5px" }}
                            key={index}
                          >
                            <Checkbox value={category.value}>
                              <span
                                style={{
                                  marginLeft: "10px",
                                }}
                              >
                                {category.label}
                              </span>
                            </Checkbox>
                          </Col>
                        );
                      })}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <Divider />
              <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Form.Item name={["range", "from"]}>
                    <InputNumber
                      name="from"
                      min={0}
                      placeholder="đ TỪ"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <span>-</span>
                  <Form.Item name={["range", "to"]}>
                    <InputNumber
                      name="to"
                      min={0}
                      placeholder="đ ĐẾN"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </div>
                <div>
                  <Button
                    onClick={() => form.submit()}
                    style={{ width: "100%" }}
                    type="primary"
                  >
                    Áp dụng
                  </Button>
                </div>
              </Form.Item>
              <Divider />
              <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
                <div>
                  <Rate
                    value={5}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text"></span>
                </div>
                <div>
                  <Rate
                    value={4}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={3}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={2}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={1}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
              </Form.Item>
            </Form>
          </Col>
          <Col md={20} xs={24} style={{ border: "1px solid red" }}>
            <Row>
              <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={(key) => setSortQuery(key)}
              />
            </Row>

            <Spin spinning={isLoading} tip="Loading...">
              <Row className="customize-row">
                {listBook &&
                  listBook.length > 0 &&
                  listBook.map((book, index) => (
                    <div className="column" key={index}>
                      <div className="wrapper">
                        <div className="thumbnail">
                          <img
                            src={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/images/book/${book.thumbnail}`}
                            alt="thumbnail book"
                          />
                        </div>
                        <div className="text">{book.mainText}</div>
                        <div className="price">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(book.price)}
                        </div>
                        <div className="rating">
                          <Rate
                            value={5}
                            disabled
                            style={{ color: "#ffce3d", fontSize: 10 }}
                          />
                          <span>Đã bán {book.sold}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </Row>
            </Spin>

            <Divider />
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                // defaultCurrent={4}
                current={current}
                total={total}
                pageSize={pageSize}
                responsive
                onChange={(p, s) =>
                  onChangePagination({ page: p, pageSizeL: s })
                }
                showSizeChanger={true}
                pageSizeOptions={["5", "10"]}
              />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
