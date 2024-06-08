import { Form, Input, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { useEffect } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(true);
  const onFinishHandler = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const response = await axios.post("https://expensetracker-cqzj.onrender.com/users/login", values);
      localStorage.setItem(
        "pratham-money-user",
        JSON.stringify({ ...response.data, password: "" })
      );
      setLoading(false);
      message.success("Login successfull !");
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Login Failed !");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("pratham-money-user")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinishHandler}>
            <h1>SIGN IN HERE</h1>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Don't have an account ? Click here to Register
              </Link>
              <button className="secondary" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://assets6.lottiefiles.com/packages/lf20_06a6pf9i.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
