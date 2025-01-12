import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrders } from "store/orderSlice";
import { fetchOrder } from "store/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.orders);
  const [selectedItem, setSelectedItem] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    dispatch(fetchOrder());
  }, []);

  const deleteOrder = (orderId) => {
    dispatch(deleteOrders(orderId));
  };

  const filteredOrders = orders
    ?.filter(
      (order) => selectedItem === "all" || order.orderStatus === selectedItem
    )

    .filter(
      (order) =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.paymentDetails.method
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order?.user?.userName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (order) =>
        date === "" ||
        new Date(order.createdAt).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
    );
  return (
    <div className="bg-gray-200 pt-20 font-sans antialiased">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
          </div>
          <div className="my-2 flex flex-col sm:flex-row">
            <div className="mb-1 flex flex-row sm:mb-0">
              <div className="relative">
                <select
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="block h-full w-full  appearance-none rounded-r border-b border-r border-t border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-l focus:border-r focus:border-gray-500 focus:bg-white focus:outline-none sm:rounded-r-none sm:border-r-0"
                >
                  <option value="all">All</option>
                  <option value="pending">pending</option>
                  <option value="delivered">delivered</option>
                  <option value="ontheway">ontheway</option>
                  <option value="cancelled">cancelled</option>
                  <option value="preparation">preparation</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative block">
              <span className="absolute inset-y-0 left-0 flex h-full items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="fill-current h-4 w-4 text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="block w-full appearance-none rounded-l rounded-r border border-b border-gray-400 bg-white py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:text-gray-700 focus:placeholder-gray-600 focus:outline-none sm:rounded-l-none"
              />
            </div>
            <div className="relative block">
              <input
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
                placeholder="Search"
                className="block w-full appearance-none rounded-l rounded-r border border-b border-gray-400 bg-white py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:text-gray-700 focus:placeholder-gray-600 focus:outline-none sm:rounded-l-none"
              />
            </div>
          </div>
          <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      OrderId
                    </th>

                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      UserName
                    </th>

                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Total Amt
                    </th>
                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Payment Status
                    </th>
                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Order Status
                    </th>
                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Order Date
                    </th>
                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders &&
                    filteredOrders.length > 0 &&
                    filteredOrders.map((order) => {
                      return (
                        <tr key={order._id}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p
                              onClick={() =>
                                navigate(`/admin/orders/${order._id}`)
                              }
                              className="whitespace-no-wrap text-blue-900"
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                            >
                              {order._id}
                            </p>
                          </td>

                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {order?.user?.userName}
                            </p>
                          </td>

                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {order.totalAmount}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {order.paymentDetails.status}(
                              {order.paymentDetails.method})
                            </p>
                          </td>

                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                              <span
                                aria-hidden
                                className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                              ></span>
                              <span className="relative">
                                {order.orderStatus}
                              </span>
                            </span>
                          </td>

                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </td>

                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <button
                              onClick={() => deleteOrder(order._id)}
                              className="whitespace-no-wrap rounded-full bg-red-500 p-2 text-gray-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="xs:flex-row xs:justify-between flex flex-col items-center border-t bg-white px-5 py-5          ">
                <span className="xs:text-sm text-xs text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="xs:mt-0 mt-2 inline-flex">
                  <button className="rounded-l bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400">
                    Prev
                  </button>
                  <button className="rounded-r bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
