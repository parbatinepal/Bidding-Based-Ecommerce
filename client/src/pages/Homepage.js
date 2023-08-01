import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { useCart } from "../Context/cart";
import './styles/Homepage.css'

import { Price } from "../components/Prices.js";
// import { useAuth } from "../Context/auth.js";
import { useSearch } from "../Context/Search.js";
import { sanitizeFilter } from "mongoose";

const HomePage = () => {
  const navigate = useNavigate();
  // const { auth, setAuth } = useAuth();
  const { cart, setCart } = useCart([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { search } = useSearch();

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/category/get-category"
      );

      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const data = JSON.stringify(localStorage.getItem("auth"));

  // Fetch products for a specific page
  const getProductsByPage = async (pageNumber) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/product-list/${pageNumber}`
      );
      setLoading(false);
      return data.products;
    } catch (error) {
      setLoading(false);
      console.log(error);
      return [];
    }
  };

  // Fetch the first page of products
  const getAllProducts = async () => {
    try {
      const products = await getProductsByPage(1);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch the total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  // Handle pagination
  const handlePageChange = async (pageNumber) => {
    try {
      const products = await getProductsByPage(pageNumber);
      setProducts(products);
      setPage(pageNumber);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more products
  const loadMore = async () => {
    try {
      const nextPage = page + 1;
      const products = await getProductsByPage(nextPage);
      setProducts([...products, ...products]);
      setPage(nextPage);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Bids Best Offers"}>
      <img
        src="https://www.softwarecreatives.com/assets/images/ibg/in-img-5.jpg"
        alt="bannersimage"
        className="banner-img img"
        padding={"12px"}
        height={400}
        width={"100%"}
      />

      <div className="d-flex flex-row" style={{ width: "100%" }}>
        <div className="p-5" style={{ width: "20%" }}>
          <div className="col-md-2" style={{ width: "100%" }}>
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          {/* price filter */}
          <div className="col-md-2" style={{ width: "100%" }}>
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className=" flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Price?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.Array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
        </div>

        <div className="products">
          <h1 className="title text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                className="card"
                style={{  margin: "0 15px" }}
                key={p._id}
              >
                <img
                  src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  loading="lazy"
                  alt={p.name}
                />

                <div className="card-body">
                  <h5 className="fs-5 fw-bold">{p.name}</h5>
                  <p className="text-muted">
                    {p.description.substring(0, 50)}
                    {p.description.length > 50 ? "..." : ""}
                  </p>
                  <p className="fw-bold">NRs {p.price}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        console.log("cart added", p);
                        setCart([...cart, p]);
                        toast.success("Items Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination d-flex justify-content-center">
            {Array.from({ length: Math.ceil(total / 3) }).map((_, index) => (
              <button
                key={index}
                className={`btn btn-info text-light ${
                  page === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
