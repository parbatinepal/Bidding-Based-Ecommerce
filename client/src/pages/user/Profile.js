import React, { useState, useEffect } from "react";
import Usermenu from "../../components/layout/Usermenu";
import Layout from "../../components/layout/layout";
import { useAuth } from "../../Context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import TextField from "@mui/material/TextField";
const Profile = () => {
  //context
  const { auth, setAuth } = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    console.log(name, email, password, address, phone);
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      console.log(data, "updated profile data");
      if (data?.error) {
        toast.error(data.error);
      } else if (data?.updatedUser) {
        setAuth({ ...auth, user: data?.updatedUser });
        localStorage.setItem("user", JSON.stringify(data?.updatedUser));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error, "error of update profilee");
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
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
                  label="Phone"
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

                <button type="submit" className="btn btn-primary">
                  UPDATE
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
