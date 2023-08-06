import mongoose from "mongoose";
import Product from "./productModel.js";
import userModel from "./userModel.js";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId, // Fix: Use mongoose.Schema.Types.ObjectId
        ref: Product, // Fix: Use the singular form of the collection name
      },
    ],
    payment: {
      type:String,

    },
    totalprice: {
      type:String,
      
    },
    buyer: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"], // Fix: Corrected typo in "delivered"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
