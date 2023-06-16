import express from "express";
import color from "colors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoute.js";
import userModel from "./models/userModel.js";
import Cors from "cors";
const app = express();

app.use(Cors());
//middelwares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//configure env
dotenv.config();

// database connection
connectDB();

//model
userModel();

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome To E-Commerce Website</h1>");
});

//PORT
const PORT = process.env.PORT || 4000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
