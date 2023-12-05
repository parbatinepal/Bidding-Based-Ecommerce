// import axios from "axios";

// export const KhaltiPayment = async (id, totalAmount, navigate) => {
//   const key = "030aeccae4e24f78a6e12f545414f6c3";
//   const url = "https://a.khalti.com/api/v2/epayment/initiate/";

//   const payload = {
//     return_url: `http://localhost:3000/cart`,
//     website_url: "http://localhost:3000",
//     amount: totalAmount * 100,
//     purchase_order_id: id,
//     purchase_order_name: "test",
//   };

//   const config = {
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Key ${key}`,
//     },
//   };

//   try {
//     const response = await axios.post(url, payload, config);

//     if (response.status === 200) {
//       const data = response.data;
//       console.log({ data });
//       navigate("/");

//       window.location.href = data.payment_url;
//     } else {
//       console.error("Error:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error:", error.response.data);
//   }
// };

import axios from "axios";

const KhaltiPayment = async (id, totalAmount, product_name) => {
  const key = "2d7a2097f38449c281d034f0b54911c5";
  const url = "https://a.khalti.com/api/v2/epayment/initiate/";

  const payload = {
    return_url: `http://localhost:3000/#/order/${id}`,
    website_url: "http://localhost:3000/",
    amount: totalAmount * 100,
    purchase_order_id: id,
    purchase_order_name: "jijiji",
  };

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Key ${key}`,
    },
  };
  try {
    const response = await axios.post(url, payload, config);
    console.log("Response  is", response);

    if (response.status === 200) {
      const data = response.data;
      console.log({ data });
      // window.navigator("/")
      window.location.href = data.payment_url;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

export default KhaltiPayment;
