import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    let token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    return { token, user };
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    console.log(auth, "auth is called in context");
  }, []);
  // useEffect(() => {
  //   const data = localStorage.getItem('auth')
  //   if (data){
  //       const parseData=JSON.parse(data)
  //       setAuth({
  //           auth,
  //           user:parseData.user,
  //           token:parsetoken.token
  //       })
  //   }
  // }, [auth]);
  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

// custom hook

export default AuthProvider;
