import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
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
    <Layout title="Forgot Password- Ecommerce Site">
      <div className="register">
        <h3>Forgot Password</h3>
        <form onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 d-flex justify-content-center align-items-center">
            <label
              htmlFor="exampleInputNewPassword1"
              className="form-label my-3 mx-3"
            >
              New Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={newPassword}
              autoComplete="off"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 d-flex justify-content-center align-items-center">
            <label
              htmlFor="exampleInputNewPassword1"
              className="form-label my-3 mx-3"
            >
              Answer :
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={answer}
              autoComplete="off"
              placeholder="Enter your favourite sport"
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary mx-2">
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
