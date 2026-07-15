import { Router } from "express";

import authRoutes from "../modules/auth/auth.route";
import propertyRoutes from "../modules/property/property.route";
import inquiryRoutes from "../modules/inquiry/inquiry.route";
import userRoutes from "../modules/user/user.route";


const router = Router();



/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

router.use(
  "/auth",
  authRoutes
);




/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

router.use(
  "/users",
  userRoutes
);




/*
|--------------------------------------------------------------------------
| Property Routes
|--------------------------------------------------------------------------
*/

router.use(
  "/properties",
  propertyRoutes
);




/*
|--------------------------------------------------------------------------
| Inquiry Routes
|--------------------------------------------------------------------------
*/

router.use(
  "/inquiries",
  inquiryRoutes
);



export default router;