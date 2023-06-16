import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Spinner = ({ path = "login" }) => {
  const [count, setcount] = useState(2);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setcount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`/${path}`);
    return () => clearInterval(interval);
  }, [count, navigate, path]);
  return (
    <>
      <div
        class="d-flex flec-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-center">redirecting to you in {count}seocnd</h1>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};
