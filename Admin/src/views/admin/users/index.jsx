import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUsers } from "store/userSlice";
import { fetchUser } from "store/userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");

  const deleteUser = (userId) => {
    dispatch(deleteUsers(userId));
  };
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const filteredUsers = users
    ?.filter(
      (user) =>
        user._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    )

    .filter(
      (user) =>
        date === "" ||
        new Date(user.createdAt).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
    );
  return (
    <div className="bg-gray-200 pt-20 font-sans antialiased">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Users</h2>
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
                className="buser buser-b buser-gray-400 block w-full appearance-none rounded-l rounded-r bg-white py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:text-gray-700 focus:placeholder-gray-600 focus:outline-none sm:rounded-l-none"
              />
            </div>
            <div className="relative block">
              <input
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
                placeholder="Search"
                className="buser buser-b buser-gray-400 block w-full appearance-none rounded-l rounded-r bg-white py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:text-gray-700 focus:placeholder-gray-600 focus:outline-none sm:rounded-l-none"
              />
            </div>
          </div>
          <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="buser-b-2 buser-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Id
                    </th>

                    <th className="buser-b-2 buser-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Email
                    </th>
                    <th className="buser-b-2 buser-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      PhoneNumber
                    </th>
                    <th className="buser-b-2 buser-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      UserName
                    </th>
                    <th className="buser-b-2 buser-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Registered At
                    </th>
                    <th className="buser-b-2 buser-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers &&
                    filteredUsers.length > 0 &&
                    filteredUsers.map((user) => {
                      return (
                        <tr key={user._id}>
                          <td className="buser-b buser-gray-200 bg-white px-5 py-5 text-sm">
                            <p
                              onClick={() => navigate(`/myUsers/${user._id}`)}
                              className="whitespace-no-wrap text-blue-900"
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                            >
                              {user._id}
                            </p>
                          </td>
                          <td className="buser-b buser-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {user.userEmail}
                            </p>
                          </td>
                          <td className="buser-b buser-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {user.userPhoneNumber}
                            </p>
                          </td>

                          <td className="buser-b buser-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {user.userName}
                            </p>
                          </td>

                          <td className="buser-b buser-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </td>

                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <button
                              onClick={() => deleteUser(user._id)}
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
              <div className="xs:flex-row xs:justify-between buser-t flex flex-col items-center bg-white px-5 py-5          ">
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

export default Users;
