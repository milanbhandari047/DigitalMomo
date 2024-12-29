import { createSlice } from "@reduxjs/toolkit";

import { STATUSES } from "../globals/misc/statuses";
import { APIAuthenticated } from "globals/http";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    status: STATUSES.SUCCESS,
    orders: null,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { setOrders, setStatus } = orderSlice.actions;

export default orderSlice.reducer;

export function fetchOrder() {
  return async function fetchOrderThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("admin/orders/");
      console.log(response.data.data);
      dispatch(setOrders(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
