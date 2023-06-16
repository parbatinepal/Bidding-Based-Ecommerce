import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png"
import { useAuth } from "../../Context/auth";
import { Toast, toast } from "react-hot-toast";
import AdminMenu from "./AdminMenu";
const Header = () => {
  const { auth, setAuth } = useAuth();
  console.log(auth, "in headers");
  const navigate = useNavigate();

  const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("logout successfully");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-success  ">
        <div className="container-fluid bg-success  ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              {/* <img src={logo} alt="logo" height={25} width={25}/> */}
              <span className="ms-1 mt-1 "> Bidding Based Ecommerce </span>
            </Link>
            <>
              <ul className=" menu navbar-nav ms-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link ">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/category" className="nav-link ">
                    Category
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link">
                    Cart (0)
                  </NavLink>
                </li>

                {!auth?.token ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            to={
                              auth?.user?.role == 0
                                ? "/admin/dashboard"
                                : "/user/dashboard"
                            }
                            className="dropdown-item"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <NavLink
                          onClick={(e) => {
                            e.preventDefault();
                            handlelogout();
                          }}
                          to="/logout"
                          className="nav-link"
                        >
                          Logout
                        </NavLink>
                      </ul>
                    </li>
                  </>
                )}
              </ul>
            </>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
