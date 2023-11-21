import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/AuthStyles.css";
import TextField from "@mui/material/TextField";

const Registers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [role, setRole] = useState();
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    console.log(name, email, password, address, phone);
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/register",
        { name, email, password, phone, address, answer, role }
      );
      console.log(res.data);
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-3">
          <TextField
          type="number"
              label="phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
          <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <TextField
              label="Answer"
              variant="outlined"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          <div className="my-3">
            {/* <input
              type="number"
              min={0}
              max={1}
              value={role}
              onChange={(e) => setRole(e.target.valueAsNumber)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is your favourite role"
              required
              
            /> */}
            <TextField
            type="number"
              label="number"
              variant="outlined"
              min={0}
              max={1}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            {/* <TextField
              label="number"
              variant="outlined"
              min={0}
              max={1}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            /> */}
            
          </div>
          
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default Registers;
