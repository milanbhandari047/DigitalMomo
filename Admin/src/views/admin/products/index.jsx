import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProduct } from "store/productsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const [selectedItem, setSelectedItem] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  console.log(products);
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  const filteredProducts = products
    ?.filter(
      (product) =>
        selectedItem === "all" || product.productStatus === selectedItem
    )

    .filter(
      (product) =>
        product._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    .filter(
      (product) =>
        date === "" ||
        new Date(product.createdAt).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
    );
  return (
    <div className="bg-gray-200 pt-20 font-sans antialiased">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Products</h2>
          </div>
          <div className="mb-1 flex flex-row sm:mb-0">
            <div className="relative">
              <select
                onChange={(e) => setSelectedItem(e.target.value)}
                className="block h-full w-full  appearance-none rounded-r border-b border-r border-t border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-l focus:border-r focus:border-gray-500 focus:bg-white focus:outline-none sm:rounded-r-none sm:border-r-0"
              >
                <option value="all">All</option>
                <option value="available">available</option>
                <option value="unavailable">unavailable</option>
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
          <div className="my-2 flex flex-col sm:flex-row">
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
                className="bproduct bproduct-b bproduct-gray-400 block w-full appearance-none rounded-l rounded-r bg-white py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:text-gray-700 focus:placeholder-gray-600 focus:outline-none sm:rounded-l-none"
              />
            </div>
            <div className="relative block">
              <input
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
                placeholder="Search"
                className="bproduct bproduct-b bproduct-gray-400 block w-full appearance-none rounded-l rounded-r bg-white py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:text-gray-700 focus:placeholder-gray-600 focus:outline-none sm:rounded-l-none"
              />
            </div>
          </div>
          <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="bproduct-b-2 bproduct-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Id
                    </th>

                    <th className="bproduct-b-2 bproduct-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Name
                    </th>
                    <th className="bproduct-b-2 bproduct-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      StockQty
                    </th>
                    <th className="bproduct-b-2 bproduct-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Price
                    </th>
                    <th className="bproduct-b-2 bproduct-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts &&
                    filteredProducts.length > 0 &&
                    filteredProducts.map((product) => {
                      return (
                        <tr key={product._id}>
                          <td className="bproduct-b bproduct-gray-200 bg-white px-5 py-5 text-sm">
                            <p
                              onClick={() =>
                                navigate(`/myproducts/${product._id}`)
                              }
                              className="whitespace-no-wrap text-blue-900"
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                            >
                              {product._id}
                            </p>
                          </td>
                          <td className="bproduct-b bproduct-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {product.productName}
                            </p>
                          </td>
                          <td className="bproduct-b bproduct-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {product.productStockQty}
                            </p>
                          </td>

                          <td className="bproduct-b bproduct-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {product.productPrice}
                            </p>
                          </td>

                          <td className="bproduct-b bproduct-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {new Date(product.createdAt).toLocaleDateString()}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="xs:flex-row xs:justify-between bproduct-t flex flex-col items-center bg-white px-5 py-5          ">
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

export default Products;
