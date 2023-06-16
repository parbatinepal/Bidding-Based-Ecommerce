import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/AuthStyles.css";
import { useAuth } from "../../Context/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassowrd, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const { auth, setAuth } = useAuth();
  console.log(auth);

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    console.log(email, newpassowrd);
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/forgot-passowrd",
        {
          email,
          newpassowrd,
          answer,
        }
      );
      console.log(res.data);
      if (res && res.data.success) {
        toast.success(res.data.message);

        console.log(auth);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"ForgotPassword"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your favourite Bid Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="Password"
              value={newpassowrd}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;