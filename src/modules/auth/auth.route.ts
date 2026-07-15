import { Router } from "express";
import passport from "passport";

import {
  registerController,
  loginController,
  googleCallback,
} from "./auth.controller";


const router = Router();



/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
|
| POST /api/auth/register
|
*/

router.post(
  "/register",
  registerController
);





/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
|
| POST /api/auth/login
|
*/

router.post(
  "/login",
  loginController
);





/*
|--------------------------------------------------------------------------
| Google Login
|--------------------------------------------------------------------------
*/


// Redirect to Google

router.get(
  "/google",

  passport.authenticate(
    "google",
    {
      scope:[
        "profile",
        "email",
      ],
      session:false,
    }
  )

);






// Google Callback

router.get(

  "/google/callback",

  passport.authenticate(
    "google",
    {
      session:false,
      failureRedirect:
        "/login",
    }
  ),

  googleCallback

);





export default router;