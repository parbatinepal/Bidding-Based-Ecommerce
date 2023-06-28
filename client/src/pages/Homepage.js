import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout.js";

import axios from "axios";
import { Checkbox, Radio } from "antd";

import e from "cors";
import { Price } from "../components/Prices.js";
import { useAuth } from "../Context/auth.js";

const HomePage = () => {
  const { auth, setAuth } = useAuth();
  const [products, setProducts] = useState([]); // Corrected destructuring
  const [categories, setCategories] = useState([]); // Corrected destructuring
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total,setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading,setLoading] = useState(false)



  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/category/get-category"
      );
      console.log(data);

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

  // console.log(localStorage.getItem("auth"));
  // const data = JSON.stringify(localStorage.getItem("auth"));


  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:4000/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // getTotal count
 const getTotal = async () => {
  try {
     const {data} = await axios.get('http://localhost:4000/api/v1/product/product-count')
     setTotal(data?.total)
  } catch (error) {
    console.log(error)
  }
 }

 useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

 //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:4000/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
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

  //get filterd product
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
    <Layout title={"Best offers "}>
      <div className="row mt-3">
        <div className="col-md-2">
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
        <div className="row mt-3">
          <div div className="col-md-2">
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Price?.map((p) => {
                  console.log(p, "proce list");
                  console.log(radio, "<<<z");
                  return (
                    <div key={p._id}>
                      <Radio value={p.Array}>{p.name}</Radio>
                    </div>
                  );
                })}
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

        <div className="col-md-9">
          {JSON.stringify(checked, radio, null, 4)}
          <h1 className="text-center">All Products</h1>
          <div div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <div>
                    <button className="btn btn-primary ms-1">
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length <total && (
              <button className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
              >
               {loading ? "Loading ..." : "Loading"}
              </button>
            )}
            
           </div>
        </div>
      </div>

      {/* <h1>HomePage</h1>
      <h4>Email: {auth?.user?.email}</h4>
      <h4>Name: {auth?.user?.name}</h4>
      <h4>Phone: {auth?.user?.phone}</h4>
      {JSON.stringify(auth?.["user"] || {})} */}
    </Layout>
  );
};

export default HomePage;
