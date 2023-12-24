import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  const [detail, setDetail] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  //get user data
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setDetail({
      name,
      email,
      phone,
      address,
      password: "",
    });
  }, [auth]);

  //handle input
  const handleInput = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  //update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, address } = detail;
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {
          name,
          email,
          phone,
          password,
          address,
          password,
        }
      );
      if (data?.error) {
        alert(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      alert("somthing went wrong!");
    }
  };

  return (
    <Layout title="Admin Panel - Ecommerce app">
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1>Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <label
                    htmlFor="exampleInputName1"
                    className="form-label my-3 mx-3"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    name="name"
                    value={detail.name}
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label my-3 mx-3"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="email"
                    value={detail.email}
                    onChange={handleInput}
                    disabled
                  />
                </div>
                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label my-3 mx-3"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    placeholder="************"
                    value={detail.password}
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <label
                    htmlFor="exampleInputPhone1"
                    className="form-label my-3 mx-3"
                  >
                    Phone:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleInputPhone1"
                    name="phone"
                    value={detail.phone}
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3 d-flex justify-content-center align-items-center ">
                  <label
                    htmlFor="exampleInputAddress1"
                    className="form-label my-3 mx-3"
                  >
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputAddress1"
                    name="address"
                    value={detail.address}
                    onChange={handleInput}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
