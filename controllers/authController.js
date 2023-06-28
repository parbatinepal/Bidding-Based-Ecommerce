import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const RegisterController = async (req, res) => {
  try {
    console.log("requestData: ", req);
    const { name, email, password, phone, address, answer } = req.body;
    console.log(name, email);
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Reigster Please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register successsfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//POST LOGIN
export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    console.log("xyz");

    let secretOrPrivateKey = process.env.JWT_SECRET;

    let token = jwt.sign(
      { _id: user._id },

      secretOrPrivateKey,
      
    );

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPassowrdController
export const forgotPassowrdController = async (req, res) => {
  try {
    const { email, answer, newpassowrd } = req.body;
    if (!email) {
      res.status(500).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(500).send({ message: "answer is required" });
    }
    if (!newpassowrd) {
      res.status(500).send({ message: "newpassword is required" });
    }
    //check
    const user = await userModel.findOne({ email });
    //validation
    console.log(user);
    if (!user) {
      return res.status(405).send({
        success: false,
        message: "wrong email or answer",
      });
    }
    const hashed = await hashPassword(newpassowrd);
    console.log(hashed);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "password reset successfully ",
    });
  } catch (error) {
    console.log(error);
    res.send(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
