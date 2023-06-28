import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { CreateCatagoryController,
     updateCategoryController,
     categoryControlller,
      singleCategoryController,
      deleteCategoryCOntroller, 
    } from "../controllers/categoryController.js";

const router = express.Router();

//routes
//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  CreateCatagoryController
);

//update category
router.put(
    "/update-category",
    requireSignIn,
    isAdmin,
    updateCategoryController
  );

  //getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryCOntroller
  );
  

export default router;
