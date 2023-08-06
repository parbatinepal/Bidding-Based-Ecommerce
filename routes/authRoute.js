import express from "express";
import {
  RegisterController,
  LoginController,
  testController,
  forgotPassowrdController,
  updateProfileController,
  getOrdersController,
  postOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER|| METHOD POST
router.post("/register", RegisterController);

//LOGIN || POST
router.post("/login", LoginController);

//Forgot Password || POST
router.post(
  "/forgot-passowrd",
  (req, res, next) => {
    console.log(req.body, "in forget password");
    next();
  },
  forgotPassowrdController
);

//Test || Routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

// orders
router.get("/orders", requireSignIn, getOrdersController);

// orders
router.post("/orders", postOrdersController);

//all orders
router.get("/all-orders", getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
