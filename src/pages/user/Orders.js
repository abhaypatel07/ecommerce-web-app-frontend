import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Admin Panel - Ecommerce app">
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 shadow">
              <h1 className="text-center">orders</h1>
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
                            <td>{order?.status}</td>
                            <td>{order?.buyer}</td>
                            <td>{moment(order?.createAt).fromNow()}</td>
                            <td>
                              {order?.payment.success ? "Success" : "Failed"}
                            </td>
                            <td>{order?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="container">
                        {/* {order?.map((p) => (
                          <div className="row m-2 card flex-row">
                            <div className="col-md-4">
                              <img
                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                alt={`${p.name}`}
                                height={"200px"}
                              />
                            </div>
                            <div className="col-md-5 p-3">
                              <h4> {p.name} </h4>
                              <p>{p.description.substring(0, 30)}</p>
                              <h4>Price : {p.price}</h4>
                            </div>
                          </div>
                        ))} */}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
