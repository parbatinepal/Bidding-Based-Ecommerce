import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Spinner } from "../Spinner";

export default function AdminRoute() {
  const { auth, setAuth } = useAuth();
  const [ok, setok] = useState(!!auth?.token ? false : true);

    // useEffect(() => {
    //   const authcheck = async () => {
    //     const res = await axios.get("/api/v1/auth/admin-auth", {
    //       headers: {
    //         Authorization: auth?.token,
    //       },
    //     });
    //     if (res.data.ok) {
    //       setok(true);
    //     } else {
    //       setok(false);
    //     }
    //   };
    //   if (auth?.token) {
    //     authcheck();
    //   }
    // }, [auth?.token]);

  return localStorage.getItem("token") ? <Outlet /> : <Spinner path="/" />;
}
