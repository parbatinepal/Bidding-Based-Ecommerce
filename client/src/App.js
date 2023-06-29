import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/auth/Login";
import Registers from "./pages/auth/Registers";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCatagory from "./pages/Admin/CreateCatagory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import { ToastContainer } from "react-toastify";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="search" element={<Search />} />
          <Route path="user" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="Orders" element={<Orders />} />
            <Route path="Profile" element={<Profile />} />
          </Route>
          <Route path="admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="create-category" element={<CreateCatagory />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="product" element={<Products />} />
            <Route path="product/:slug" element={<UpdateProduct />} />

            <Route path="users" element={<Users />} />
          </Route>

          <Route path="/register" element={<Registers />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
