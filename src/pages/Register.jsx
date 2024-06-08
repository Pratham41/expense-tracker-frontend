import { Form, Input, message } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(true);

  const onFinishHandler = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      await axios.post("https://expense-tracker-backend-theta.vercel.app/users/register", values);
      setLoading(false);
      message.success("Registration successfull !");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
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
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinishHandler}>
            <h1>SIGN UP HERE</h1>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered, Click here to Login</Link>
              <button className="secondary" type="submit">
                Register
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
