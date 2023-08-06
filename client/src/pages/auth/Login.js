import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/AuthStyles.css";
import { useAuth } from "../../Context/auth";
// import { useContext } from "react";
import TextField from "@mui/material/TextField";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  console.log(auth);

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    console.log(email, password);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/v1/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
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
    <Layout title="Register">
      <div className="form-container">
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
          <TextField
              label="Password"
              variant="outlined"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="mb-3">
            <button
              type="button"
              className="btn forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
             <span className="mt-1">Forgot Password</span> 
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
