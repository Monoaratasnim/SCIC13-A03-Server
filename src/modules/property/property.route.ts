import { Router } from "express";

import {
  createPropertyController,
  getAllPropertiesController,
  getSinglePropertyController,
  getMyPropertiesController,
  updatePropertyController,
  deletePropertyController,
} from "./property.controller";

import authMiddleware from "../../middleware/auth.middleware";
import upload from "../../middleware/upload.middleware";

const router = Router();





/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/


// Get all properties
router.get(
  "/",
  getAllPropertiesController
);





/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/


// Get owner's properties
router.get(
  "/my-properties",
  authMiddleware,
  getMyPropertiesController
);



// Create property
router.post(
  "/",
  authMiddleware,
  upload.array("images", 5),
  createPropertyController
);



// Update property
router.patch(
  "/:id",
  authMiddleware,
  updatePropertyController
);



// Delete property
router.delete(
  "/:id",
  authMiddleware,
  deletePropertyController
);





/*
|--------------------------------------------------------------------------
| Get Single Property
|--------------------------------------------------------------------------
*/


router.get(
  "/:id",
  getSinglePropertyController
);




export default router;