import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
// Protected Routes token base
export const requireSignIn = async (req, _res, next) => {
  console.log(req.headers.authorization);
  console.log(process.env.JWT_SECRET);
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log(decode, "decoded");
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return _res.status(401).json({ error: "unauthorized" });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    console.log(user);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
