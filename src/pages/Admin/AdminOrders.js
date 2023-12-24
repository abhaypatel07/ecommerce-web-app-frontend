import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

export const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not process",
    "Processing",
    "Shipped",
    "Deliverd",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={`Orders - Ecommerce site`}>
        <div className="container-fluid m-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center">All Orders</h1>
              {orders?.map((order, index) => {
                return (
                  <>
                    <div className="boarder">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="mt-2 p-2">
                            <td>{index + 1}.</td>
                            <td>
                              <Select
                                border={false}
                                onChange={(value) => {
                                  handleChange(order?._id, value);
                                }}
                                defaultValue={order?.status}
                              >
                                {status.map((s, i) => {
                                  return (
                                    <Option key={i} value={s}>
                                      {s}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </td>
                            <td>{order?.buyer}</td>
                            <td>{moment(order?.createAt).fromNow()}</td>
                            <td>
                              {order?.payment.success ? "Success" : "Failed"}
                            </td>
                            <td>{order?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
