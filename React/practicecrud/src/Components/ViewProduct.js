import React from "react";

const ViewProduct = (props) => {
  return (
    <div>
      <span>{props.data.product}</span>
      <span>{props.data.creator}</span>
    </div>
  );
};

export default ViewProduct;
