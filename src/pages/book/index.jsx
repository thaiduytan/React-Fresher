import React from "react";
import { useLocation } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "./Book.scss";
import { Col, Divider, Rate, Row } from "antd";
import BookModalViewDetailSlider from "./BookModalViewDetailSlider";
import {
  MinusOutlined,
  PlusOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import BookLoadder from "./BookLoadder";
import { callGetBookDetailById } from "../../apiService/api";

const BookPage = () => {
  const [openBookModalViewDetailSlider, setOpenBookModalViewDetailSlider] =
    React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [dataBookDetail, setDataBookDetail] = React.useState({});
  const [listThumb, setListThumb] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const refGallery = React.useRef(null);
  // https://reactrouter.com/en/main/hooks/use-location
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams?.get("id");

  const fetchDataDetailBook = async () => {
    setLoading(true);

    const res = await callGetBookDetailById(id);
    if (res && res.data) {
      let listThumb = [...res.data.slider, res.data.thumbnail];
      let result = listThumb.map((item) => {
        return {
          original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        };
      });
      // console.log("result >>> result:", result);

      setTimeout(async function () {
        // Mã JavaScript bạn muốn thực hiện sau 1 giây
        setDataBookDetail(res?.data);
        setListThumb(result);
        setLoading(false);
      }, 1000); // 1000 milliseconds tương đương với 1 giây
    }
  };
  React.useEffect(() => {
    fetchDataDetailBook();
  }, [id]);

  // const images = [
  // {
  //   original: `${import.meta.env.VITE_BACKEND_URL}/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg`,
  //   thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg`,
  // },
  // {
  //   original: `${import.meta.env.VITE_BACKEND_URL}/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg`,
  //   thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg`,
  // },
  // {
  //   original: "https://picsum.photos/id/1019/1000/600/",
  //   thumbnail: "https://picsum.photos/id/1019/250/150/",
  // }
  // ];

  const handleOnClickImage = () => {
    //get current index onClick
    // alert(refGallery?.current?.getCurrentIndex());
    setOpenBookModalViewDetailSlider(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    // refGallery?.current?.fullScreen()
  };
  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div
        className="detail-book-container"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          minHeight: "calc(100vh - 150px)",
        }}
      >
        <div style={{ padding: "20px", background: "#fff", borderRadius: 5 }}>
          {loading && <BookLoadder />}
          {!loading && (
            <Row gutter={[20, 20]}>
              <Col md={10} sm={0} xs={0}>
                <ImageGallery
                  ref={refGallery}
                  items={listThumb}
                  showPlayButton={false} //hide play button
                  showFullscreenButton={false} //hide fullscreen button
                  renderLeftNav={() => <></>} //left arrow === <> </>
                  renderRightNav={() => <></>} //right arrow === <> </>
                  slideOnThumbnailOver={true} //onHover => auto scroll images
                  onClick={() => handleOnClickImage()}
                />
              </Col>

              <Col md={14} sm={24}>
                <Col md={0} sm={24} xs={24} style={{ paddingBottom: 15 }}>
                  <ImageGallery
                    ref={refGallery}
                    items={listThumb}
                    showPlayButton={false} //hide play button
                    showFullscreenButton={false} //hide fullscreen button
                    renderLeftNav={() => <></>} //left arrow === <> </>
                    renderRightNav={() => <></>} //right arrow === <> </>
                    showThumbnails={false}
                  />
                </Col>
                <Col span={24}>
                  <div className="author">
                    Tác giả: <a href="#">{dataBookDetail.author}</a>
                  </div>
                  <div className="title">{dataBookDetail.mainText}</div>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: "#ffce3d", fontSize: 12 }}
                    />
                    <span className="sold">
                      <Divider type="vertical" />
                      Đã bán: {dataBookDetail.sold}
                    </span>
                  </div>
                  <div className="price">
                    <span className="currency">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(dataBookDetail.price)}
                    </span>
                  </div>
                  <div className="delivery">
                    <div>
                      <span className="left_side">Vận chuyển</span>
                      <span className="right_side">Miễn phí vận chuyển</span>
                    </div>
                  </div>
                  <div className="quantity">
                    <span className="left_side">Số lượng</span>
                    <span className="right_side">
                      <button>
                        <MinusOutlined />
                      </button>
                      <input defaultValue={1} />
                      <button>
                        <PlusOutlined />
                      </button>
                    </span>
                  </div>
                  <div className="buy">
                    <button className="cart">
                      <PlusSquareOutlined className="icon-cart" />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                    <button className="now">Mua ngay</button>
                  </div>
                </Col>
              </Col>
            </Row>
          )}
        </div>
      </div>
      <BookModalViewDetailSlider
        show={openBookModalViewDetailSlider}
        setShow={setOpenBookModalViewDetailSlider}
        images={listThumb}
        title={dataBookDetail.mainText}
      ></BookModalViewDetailSlider>
    </div>
  );
};
// thumbnailPosition={"right"}
export default BookPage;
