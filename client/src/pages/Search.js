import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { useSearch } from "../Context/Search";
import axios from "axios";

const Search = () => {
  const { search, setSearch } = useSearch();
  console.log(search, "sear ch");
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/search/${search}`
      );
      console.log(data, "search");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      getProducts();
    }
  }, [search]);

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {products.length < 1
              ? "No Products Found"
              : `Found ${products.length}`}
          </h6>
          <div div className="d-flex flex-wrap mt-4">
            {products.map((p) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default Search;
