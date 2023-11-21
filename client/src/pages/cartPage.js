import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import "../pages/styles/CartStyles.css";
import toast from "react-hot-toast";
import KhaltiCheckout from "khalti-checkout-web";
import Modal from "@material-ui/core/Modal";
import KhaltiPayment from "../khalti/KhaltiPayment";

const CartPage = () => {
  const auth = useAuth();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const { cart, setCart, removeCartItem, totalPrice } = useCart();
  const data = JSON.parse(user);
  const [minusvalue, setminusvalue] = useState(totalPrice() - 20);
  const navigate = useNavigate();
  console.log(cart, "in cart page");
  const [value, setvalue] = useState(totalPrice());
  const [show, setshow] = useState(true);
  const [handleclose, sethandleclose] = useState(false);

  //placeorder
  const placeorder = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/v1/auth/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          products: cart,
          payment: "khaltipayment",
          status: "Not Process",
          buyer: data["name"],
          totalprice: value,
        }),
      });
      // if (!res.ok) {
      //     throw new Error(`HTTP error! status:`);
      //   }
      console.log(res.body);
      if (res.status == 200) {
        const json = await res.json();
        console.log(json);
        toast.success("orders successfully");
      }
    } catch (e) {
      
      console.log(e);
    }
  };

  let config = {
    publicKey: "test_public_key_a59147b8ebef4d24b03154408ea13751",
    productIdentity: "1234567890",
    productName: "Drogon",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      onSuccess(payload) {
        placeorder();
        // hit merchant api for initiating verfication
        console.log(payload);
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
    },
    // one can set the order of payment options and also the payment options based on the order and items in the array
    paymentPreference: [
      "MOBILE_BANKING",
      "KHALTI",
      "EBANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  let checkout = new KhaltiCheckout(config);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello "
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart 
                    `
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="row m-2  ">
          <div className="col-md-5  p-0 m-0">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="10%"
                    height={"150px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>price : {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total :NRs {totalPrice()} </h4>

            {data?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{data?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/User/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <button
              className="btn btn-primary"
              onClick={() =>
                // placeorder()}

                // checkout.show({amount: totalPrice()*100})
                handleOpen()
              }
            >
              Buynow
            </button>
            <Modal
              onClose={handleClose}
              open={open}
              style={{
                position: "absolute",
                border: "2px solid #000",
                backgroundColor: "gray",
                boxShadow: "2px solid black",
                height: 400,
                width: 400,
                margin: "auto",
              }}
            >
              <div>
                <div className="mb-3 p-3">
                  <div className="d-flex justify-content-center">
                    <h1
                      style={{
                        paddingRight: "10px",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        let decvalue = value - 5;

                        if (minusvalue == value) {
                          toast.error("You cannot do more");
                        } else {
                          setvalue(decvalue);
                        }
                      }}
                    >
                      -
                    </h1>
                    <h1
                      style={{
                        paddingRight: "10px",
                        paddingLeft: "10px",
                        color: "white",
                      }}
                    >
                      {value}
                    </h1>
                    <h1
                      style={{
                        paddingLeft: "10px",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        let decvalue = value + 5;
                        setvalue(decvalue);
                      }}
                    >
                      +
                    </h1>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary "
                  onClick={() => {
                    // checkout.show({ amount: value * 100 });
                    // KhaltiModal({show:show,handleClose:handleclose,id:"123456",totalAmount:value})
                    KhaltiPayment("123", value, navigate).then(() => {
                      placeorder();
                    });
                  }}
                  style={{ marginLeft: "150px" }}
                >
                  Submit
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
