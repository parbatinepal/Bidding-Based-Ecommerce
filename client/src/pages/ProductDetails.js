import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/cart";
import { toast } from "react-hot-toast";
import "./styles/ProductDetailsStyles.css"
const ProductDetails = () => {
  const { cart, setCart } = useCart([]);
  const user = localStorage.getItem("user");
  const data = JSON.parse(user);
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const addtoRecommendation=async()=>{
    try {
      const response = await fetch('`http://localhost:4000/api/v1/auth/addtorec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify({
          "category":product?.category?.name,"email":data["email"]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // If you need the response data
      const responseData = await response.json();
      console.log('Response Data:', responseData);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);

      getSimilarProduct(data?.product._id, data?.product.category._id);
      addtoRecommendation();
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container m-2">
        <div className="col-md-6">
          <img
            src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product?.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProduct.length < 1 && (
           <p className="text-center">No Similar Product found</p>)}
        <div div className="d-flex flex-wrap">
          {relatedProduct?.map((p) => (
            <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> NRs {p.price}</p>
                <div>
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
      </div>
    </Layout>
  );
};

export default ProductDetails;
