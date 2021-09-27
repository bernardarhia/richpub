import React from "react";

const FullLoader = ({ loader }) => {
  return (
    !loader && (
      <div className="big-loader__container">
        <div className="loader"></div>
      </div>
    )
  );
};

export default FullLoader;
