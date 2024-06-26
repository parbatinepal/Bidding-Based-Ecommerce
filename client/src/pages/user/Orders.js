import React, { useState, useEffect } from "react";
import Usermenu from "../../components/layout/Usermenu";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth, setAuth } = useAuth();

  const getOrders = async () => {
    try {
      const  data  = await axios.get(
        "http://localhost:4000/api/v1/auth/orders"
      );
      const res = await data.data
      setOrders(res);
      console.log(res + " Hello");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(orders + "Ordersjsg");

  useEffect(() => {
    getOrders();
    if (auth?.token) {
    }
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            {orders?.length == 0 ? (
              <p>No orders found.</p>
            ) : (
              <>
                <h1 className="text-center">All Orders</h1>
                <div className="border shadow">
                  <table className="table text-light">
                    <thead>
                      <tr>
                        <th scope="col">SN</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">TotalPrice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o,i) => {
                        console.log(orders);
                        return (
                          <React.Fragment key={o._id}>
                            <tr>
                              <td>{ i+1}</td>
                              <td>{o?.status}</td>
                              <td>{o?.buyer}</td>
                              <td>{moment(o.updatedAt).format('lll')}</td>
                              <td> {o?.payment}</td>
                              <td>{o?.products?.length}</td>
                              <td>{ o.totalprice}</td>
                            </tr>
                            <div className="container">
                              {o?.products?.map((p,i) => (
                                <div
                                  className="row mb-2 p-3 card flex-row"
                                  key={p._id}
                                >
                                  <div className="col-md-4">
                                    <img
                                      src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                                      className="card-img-top"
                                      alt={p.name}
                                      width="100px"
                                      height="100px"
                                    />
                                  </div>
                                  <div className="col-md-8">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>Price: {p.price}</p>
                                  </div>
                                  
                                </div>
                              ))}
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
