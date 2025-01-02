import { APIAuthenticated } from "globals/http";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateOrderStatus } from "store/orderSlice";

const SingleOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const [filterOrder] = orders?.filter((order) => order._id === id);

  const [orderStatus, setOrderStatus] = useState(filterOrder?.orderStatus);
  const handleOrderStatus = (e) => {
    setOrderStatus(e.target.value);
    dispatch(updateOrderStatus(id, e.target.value));
  };

  const deleteOrder = async () => {
    try {
      const response = await APIAuthenticated.delete("/admin/orders/" + id);
      if (response.status === 200) {
        navigate("/admin/orders");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="px-4 py-20 2xl:container md:px-6 2xl:mx-auto 2xl:px-20">
        <div className="item-start flex flex-col justify-start space-y-5">
          <h1 className="text-1xl dark:text-gray font-semibold leading-7 text-gray-800 lg:text-2xl lg:leading-9">
            Order {id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600 dark:text-gray-300">
            21st Mart 2021 at 10:34 PM
          </p>
        </div>
        <div className="mt-10 flex w-full flex-col items-stretch justify-center space-y-4 md:space-y-6 xl:flex-row xl:space-x-8 xl:space-y-0">
          <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex w-full flex-col items-start justify-start bg-gray-50 px-4 py-4 dark:bg-gray-800 md:p-6 md:py-6 xl:p-8">
              <p className="text-lg font-semibold leading-6 text-gray-800 dark:text-white md:text-xl xl:leading-5">
                My Order
              </p>
              {filterOrder &&
                filterOrder.items.length > 0 &&
                filterOrder.items.map((item) => {
                  return (
                    <div className="mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8">
                      <div className="w-full pb-4 md:w-40 md:pb-8">
                        <img
                          className="hidden w-full md:block"
                          src={item?.product?.productImage}
                          alt={item?.product.productName}
                        />
                        <img
                          className="w-full md:hidden"
                          src={item?.product?.productImage}
                          alt={item?.product?.productName}
                        />
                      </div>
                      <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
                        <div className="flex w-full flex-col items-start justify-start space-y-8">
                          <h3 className="text-xl font-semibold leading-6 text-gray-800 dark:text-white xl:text-2xl">
                            {item?.product?.productName}
                          </h3>
                        </div>
                        <div className="flex w-full items-start justify-between space-x-8">
                          <p className="text-base leading-6 dark:text-white xl:text-lg">
                            Rs. {item?.product?.productPrice}{" "}
                          </p>
                          <p className="text-base leading-6 text-gray-800 dark:text-white xl:text-lg">
                            Qty: {item?.quantity}
                          </p>
                          <p className="text-base font-semibold leading-6 text-gray-800 dark:text-white xl:text-lg">
                            Rs. {item?.product?.productPrice * item?.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="flex w-full  flex-col items-stretch justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0 xl:space-x-8">
              <div className="flex w-full flex-col space-y-6 bg-gray-50 px-4 py-6 dark:bg-gray-800 md:p-6 xl:p-8">
                <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-white">
                  Summary
                </h3>
                <div className="flex w-full flex-col items-center justify-center space-y-4 border-b border-gray-200 pb-4">
                  <div className="flex w-full justify-between">
                    <p className="text-base leading-4 text-gray-800 dark:text-white">
                      Payment Method
                    </p>
                    <p className="text-base leading-4 text-gray-600 dark:text-gray-300">
                      {filterOrder?.paymentDetails?.method}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="text-base leading-4 text-gray-800 dark:text-white">
                      Payment Status
                    </p>
                    <p className="text-base leading-4 text-gray-600 dark:text-gray-300">
                      {filterOrder?.paymentDetails?.status}
                    </p>
                  </div>

                  <div className="flex w-full items-center justify-between">
                    <p className="text-base leading-4 text-gray-800 dark:text-white">
                      Order Status
                    </p>
                    <p className="text-base leading-4 text-gray-600 dark:text-gray-300">
                      {filterOrder?.orderStatus}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className="text-base font-semibold leading-4 text-gray-800 dark:text-white">
                    Total
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600 dark:text-gray-300">
                    Rs. {filterOrder?.totalAmount}
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col justify-center space-y-6 bg-gray-50 px-4 py-6 dark:bg-gray-800 md:p-6 xl:p-8">
                <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-white">
                  Shipping
                </h3>
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="h-8 w-8">
                      <img
                        className="h-full w-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-start">
                      <p className="text-lg font-semibold leading-6 text-gray-800 dark:text-white">
                        Delivery Charge
                        <br />
                        <span className="font-normal">
                          Delivery with 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800 dark:text-white">
                    Rs. 100
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex w-full flex-col items-center justify-between bg-gray-50 px-4 py-6 dark:bg-gray-800 md:items-start md:p-6 xl:w-96 xl:p-8"
            style={{ height: "200px" }}
          >
            <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-white">
              Customer
            </h3>
            <div className="flex h-full w-full flex-col items-stretch justify-start md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0">
              <div className="mt-6 flex w-full flex-col items-stretch justify-between md:mt-0 xl:h-full">
                <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:items-start md:justify-start md:space-x-6 md:space-y-0 lg:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-12">
                  <div className="flex flex-col items-center justify-center space-y-4 md:items-start md:justify-start xl:mt-8">
                    <p className="text-center text-base font-semibold leading-4 text-gray-800 dark:text-white md:text-left">
                      Name :{filterOrder?.user.userName}
                    </p>
                    <p className="text-center text-base font-semibold leading-4 text-gray-800 dark:text-white md:text-left">
                      ShippingAddress :{filterOrder?.shippingAddress}
                    </p>
                    <p className="w-48 text-center text-sm leading-5 text-gray-600 dark:text-gray-300 md:text-left lg:w-full xl:w-48">
                      Phone : {filterOrder?.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center md:items-start md:justify-start">
                  <form class="mx-auto max-w-sm">
                    <label
                      for="status"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Order Status
                    </label>
                    <select
                      id="status"
                      onChange={handleOrderStatus}
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option value={filterOrder?.orderStatus}>
                        {filterOrder?.orderStatus}
                      </option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="ontheway">ontheway</option>
                      <option value="preparation">Preparation</option>
                    </select>
                  </form>
                </div>
                {filterOrder?.orderStatus !== "cancelled" && (
                  <div className="flex w-full items-center justify-center md:items-start md:justify-start">
                    <button
                      className="mt- dark:bg-transparent w-96 border border-gray-800 py-3 text-base font-medium leading-4 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:border-white dark:text-white dark:hover:bg-gray-900  md:mt-0 2xl:w-full"
                      style={{
                        marginTop: "10px",
                        backgroundColor: "red",
                        color: "white",
                      }}
                      onClick={deleteOrder}
                    >
                      Delete Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleOrder;
