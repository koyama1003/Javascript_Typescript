import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductsContainer from "./ProductsContainer";
import FormContainer from "./FormContainer";

const MainContainer = () => {
  const [state, setState] = useState({ products: [], name: [] });
  const createProduct = (product) => {
    axios
      .post("http://localhost:3001/products", { product: product })
      .then((response) => {
        const newData = axios.update(this.state.products, {
          $push: [response.data],
        });
        this.setState({ products: newData });
      })
      .catch((data) => {
        console.log(data);
      });
  };
  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/products")
      .then((results) => {
        setState({ ...state, products: [results.data] });
      })
      .catch((error) => {
        console.log("ログインエラー", error);
      });
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  return (
    <div className="app-main">
      <FormContainer />
      <ProductsContainer productData={state.products[0]} />
    </div>
  );
};
export default MainContainer;
