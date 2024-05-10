import React from "react";
import Review from "./component/review/Review";

import { useParams } from "react-router-dom";
import Product from "./component/product/Product";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <Product id={id} />
      <Review />
    </div>
  );
};

export default ProductDetails;
