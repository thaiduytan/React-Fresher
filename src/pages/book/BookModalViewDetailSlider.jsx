import { Col, Image, Modal, Row } from "antd";
import React from "react";
import ImageGallery from "react-image-gallery";

const BookModalViewDetailSlider = ({ show, setShow, images, title }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleOk = () => {
    setShow(false);
  };
  const handleCancel = () => {
    setShow(false);
  };
  const handleThumbnailClick = (index) => {
    console.log("handleThumbnailClick >>> index:", index);

    setSelectedIndex(index);
  };
  return (
    <>
      <Modal
        className="modal-detail-slider"
        // title="Basic Modal"
        open={show}
        // onOk={handleOk}
        closable={false}
        footer={null}
        onCancel={handleCancel}
        width={"60%"}
        style={{ maxHeight: "none" }}
      >
        <Row gutter={[20, 20]}>
          <Col span={17}>
            <ImageGallery
              items={images}
              showFullscreenButton={false}
              //   showNav={false}
              autoPlay={false}
              // thumbnailPosition={"right"}
              disableThumbnailScroll={true}
              showThumbnails={false}
              startIndex={selectedIndex}
              onSlide={(currentIndex) => {
                setSelectedIndex(currentIndex);
              }}
              showPlayButton={false}
              slideDuration={0}
            />
          </Col>
          <Col span={7}>
            <ThumbnailList
              title={title}
              images={images}
              onThumbnailClick={handleThumbnailClick}
              selectedIndex={selectedIndex}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
function ThumbnailList({ images, onThumbnailClick, selectedIndex, title }) {
  return (
    <>
      <div
        style={{ paddingBottom: "20px", fontSize: "20px" }}
      >
        {title}
      </div>
      <Row className="thumbnail-list">
        {images.map((image, index) => (
          <Col
            key={index}
            className={`thumbnail ${selectedIndex === index ? "active" : ""}`}
            onClick={() => onThumbnailClick(index)}
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            {/* <img src={image.thumbnail} alt={image.description} /> */}
            <Image
              width={"100%"}
              height={"100%"}
              src={image.thumbnail}
              preview={false}
              alt={image.description}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
export default BookModalViewDetailSlider;
