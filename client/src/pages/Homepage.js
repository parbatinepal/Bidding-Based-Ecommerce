import React from "react";
import Layout from "../components/layout/layout.js";
import { useAuth } from "../Context/auth.js";

const HomePage = () => {
  const { auth, setAuth } = useAuth();

  // console.log(localStorage.getItem("auth"));
  // const data = JSON.stringify(localStorage.getItem("auth"));

  return (
    <Layout title={"Best offers "}>
      <h1>HomePage</h1>
      <h4>Email: {auth?.user?.email}</h4>
      <h4>Name: {auth?.user?.name}</h4>
      <h4>Phone: {auth?.user?.phone}</h4>
      {/* {JSON.stringify(auth?.["user"] || {})} */}
    </Layout>
  );
};

export default HomePage;
