import React from "react";
import ViewProduct from "./ViewProduct";

const ProductsContainer = (props) => {
  const datas = props.productData;
  console.log(datas);
  return (
    <div className="productList">
      {datas
        ? datas.map((data) => {
            return <ViewProduct data={data} key={data.id} />;
          })
        : "loading"}
    </div>
  );
};

export default ProductsContainer;
