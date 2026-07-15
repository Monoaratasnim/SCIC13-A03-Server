import { Request, Response } from "express";

import {
  registerUser,
  loginUser,
} from "./auth.service";

import {
  registerSchema,
  loginSchema,
} from "./auth.validation";

import { createToken } from "../../utils/jwt";





// =====================================================
// Register Controller
// =====================================================

export const registerController = async (
  req: Request,
  res: Response
) => {

  try {


    const validatedData =
      registerSchema.parse(
        req.body
      );



    const result =
      await registerUser(
        validatedData
      );



    return res.status(201).json({

      success:true,

      message:
        "User registered successfully",

      data:result,

    });



  } catch(error:any){


    return res.status(400).json({

      success:false,

      message:
        error.message ||
        "Registration failed",

    });


  }

};








// =====================================================
// Login Controller
// =====================================================

export const loginController = async (
  req: Request,
  res: Response
) => {

  try {


    const validatedData =
      loginSchema.parse(
        req.body
      );



    const result =
      await loginUser(
        validatedData
      );



    return res.status(200).json({

      success:true,

      message:
        "Login successful",

      data:result,

    });



  } catch(error:any){


    return res.status(401).json({

      success:false,

      message:
        error.message ||
        "Login failed",

    });


  }

};









// =====================================================
// Google Login Callback
// =====================================================

export const googleCallback = async (
  req: Request,
  res: Response
) => {


  try {


    const user = req.user;



    if(!user){

      return res.status(401).json({

        success:false,

        message:
          "Google authentication failed",

      });

    }





    const token =
      createToken({

        id:
          user._id.toString(),

        email:
          user.email,

        role:
          user.role,

      });







 return res.redirect(
  `${process.env.CLIENT_URL}/?token=${token}`
);




  } catch(error:any){


    return res.status(500).json({

      success:false,

      message:
        error.message ||
        "Google login failed",

    });


  }

};