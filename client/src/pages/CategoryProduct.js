import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import "../pages/styles/CategoryProductsStyles.css"
import { useCart } from "../Context/cart";
import { toast } from "react-hot-toast";


const CategoryProduct = () => {
  const { cart, setCart } = useCart([]);

    const params = useParams();
    const navigate = useNavigate();
    const [products , setProducts] = useState([]);
    const [category , setCategory] = useState([]);
    const { addToCart, removeCartItem, totalPrice } = useCart();

    useEffect(() => {
        if(params?.slug) getProductsByCat();
    },[params?.slug]);
    const getProductsByCat = async () => {
        try {
            const {data} = await axios.get(`http://localhost:4000/api/v1/product/product-category/${params.slug}`)
            console.log(data)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
            
        }
    }
  return (
    <Layout>
        <div className="container mt-3">
            <h4 className="text-center">Catagory - {category?.name}</h4>
            <h6 className="text-center">{products?.length} result found </h6>
            <div className="row">
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                className="card"
                style={{ width: "30%", margin: "0 15px" }}
                key={p._id}
              >
                <img
                  src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  loading="lazy"
                  alt={p.name}
                />

                <div className="card-body">
                  <h5 className="fs-4 fw-bold">{p.name}</h5>
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
                       }} >
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
  )
}

export default CategoryProduct