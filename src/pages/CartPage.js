import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

export const CartPage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  //for payment
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //total calculator
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
        return;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //remove cart item
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      navigate("/dashboard/user/order");
      alert("payement compleated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title="Ecommerce App - My Cart">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2 mb-2">
                {`Hello ${auth?.token && auth?.user?.name}`}
              </h1>
              <h4 className="text-center">
                {cart?.length > 1
                  ? `You have ${cart.length} items in your cart ${
                      auth?.token ? "" : "Please Login To Checkout"
                    } `
                  : "Your Cart Is Empty"}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
              {cart?.map((p) => (
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
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeCartItem(p._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 text-center pt-3">
              <h2>Cart Summary</h2>
              <p>Total | CheckOut | Payment</p>
              <hr />
              <h4>Total : {`${totalPrice()}`}</h4>
              <hr />
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning mt-3"
                      onClick={() => {
                        navigate("../dashboard/user/profile");
                      }}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    {auth?.token ? (
                      <>
                        <button
                          className="btn btn-outline-warning mt-3"
                          onClick={() => {
                            navigate("../dashboard/user/profile");
                          }}
                        >
                          Update Address
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline-warning mt-3"
                          onClick={() => {
                            navigate("../login", {
                              state: "/cart",
                            });
                          }}
                        >
                          Please Login
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
              <div className="mt-2">
                {!clientToken || !cart?.length || !auth?.user?.address ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

//oduhouhwchdhwisuhw
//basouhdoahodhwudbd
