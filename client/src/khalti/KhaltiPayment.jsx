import axios from "axios";

export const KhaltiPayment = async (id, totalAmount, navigate) => {
  const key = "eb81731dcf59441381a7cf1ad74d8410";
  const url = "https://a.khalti.com/api/v2/epayment/initiate/";

  const payload = {
    return_url: `http://localhost:3000/cart`,
    website_url: "http://localhost:3000",
    amount: totalAmount * 100, // convert to paisa
    purchase_order_id: id,
    purchase_order_name: "test",
  };

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Key ${key}`,
    },
  };

  try {
    const response = await axios.post(url, payload, config);

    if (response.status === 200) {
      const data = response.data;
      console.log({ data });
      navigate("/");

      window.location.href = data.payment_url;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.response.data);
  }
};
