import { createSlice } from "@reduxjs/toolkit";

import { STATUSES } from "../globals/misc/statuses";
import { APIAuthenticated } from "globals/http";

const productSlice = createSlice({
  name: "product",
  initialState: {
    status: STATUSES.SUCCESS,
    products: null,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    deleteProductById(state, action) {
      const index = state.products.findIndex(
        (product) => product._id === action.payload.productId
      );
      state.products.splice(index, 1);
    },
  },
});

export const { setProducts, setStatus, deleteProductById } =
  productSlice.actions;

export default productSlice.reducer;

export function fetchProduct() {
  return async function fetchProductThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("products");
      dispatch(setProducts(response.data.data.reverse()));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function deleteProducts(productId) {
  return async function deleteProductsThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.delete(`/products/${productId}`);
      dispatch(deleteProductById({ productId }));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
