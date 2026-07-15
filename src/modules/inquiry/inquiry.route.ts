import { Router } from "express";

import {
  createInquiryController,
  getOwnerInquiriesController,
  getMyInquiriesController,
  getAllInquiriesController,
  deleteInquiryController,
  updateInquiryStatusController,
} from "./inquiry.controller";

import authMiddleware from "../../middleware/auth.middleware";


const router = Router();



/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/


// User sends inquiry
router.post(
  "/",
  authMiddleware,
  createInquiryController
);



// User sees inquiries they sent
router.get(
  "/my",
  authMiddleware,
  getMyInquiriesController
);



// Owner receives inquiries
router.get(
  "/owner",
  authMiddleware,
  getOwnerInquiriesController
);



// Admin gets all inquiries
router.get(
  "/",
  authMiddleware,
  getAllInquiriesController
);



// Owner updates inquiry status
router.patch(
  "/:id/status",
  authMiddleware,
  updateInquiryStatusController
);



// Owner deletes inquiry
router.delete(
  "/:id",
  authMiddleware,
  deleteInquiryController
);



export default router;