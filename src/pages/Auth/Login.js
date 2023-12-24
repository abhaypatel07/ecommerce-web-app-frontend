import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        alert(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
        <h3>Login Form</h3>
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
              value={password}
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="submit" className="btn btn-primary mx-2" onClick={()=>navigate("/forgot-password")}>
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
