import React from "react";
// thu vien spinners npm
import RingLoader from "react-spinners/RingLoader";

const Loading = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div style={style}>
      <RingLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;
