import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    answer: "",
  });

  const handleInput = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  //submite the registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, address, answer } = detail;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          phone,
          password,
          address,
          answer,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        alert(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong!");
    }
  };

  return (
    <Layout title="SignUp Page - Ecommerce Site">
      <div className="register">
        <h3>Register Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex justify-content-center align-items-center">
            <label htmlFor="exampleInputName1" className="form-label my-3 mx-3">
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
              value={detail.password}
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
          <div className="mb-3 d-flex justify-content-center align-items-center ">
            <label
              htmlFor="exampleInputAnswer1"
              className="form-label my-3 mx-3"
            >
              Answer:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAnswer1"
              name="answer"
              value={detail.answer}
              onChange={handleInput}
              placeholder="What is your favourite sport"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
