import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/layout'
import useCategory from "../hooks/useCategory";
import "./styles/categories.css"
const Categories = () => {
    const categories = useCategory();
    return (
      <Layout title={"All Categories"}>
        <div className="container">
          <div className="row">
            {categories.map((c) => (
              <div className="col-md-4 mt-5 mb-5 gx-6 gy-6" key={c._id}>
                <Link to={`/category/${c.slug}`} className="btn btn-primary">
                  {c.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  };
export default Categories