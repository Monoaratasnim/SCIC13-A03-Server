import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";



const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {


  try {


    const authHeader =
      req.headers.authorization;



    if (!authHeader) {

      return res.status(401).json({

        success: false,

        message:
          "No token provided",

      });

    }




    /*
    Expected format:

    Authorization: Bearer token_here

    */


    const token =
      authHeader.split(" ")[1];



    if (!token) {

      return res.status(401).json({

        success:false,

        message:
          "Invalid authorization format",

      });

    }




    const secret =
      process.env.JWT_SECRET;



    if (!secret) {

      throw new Error(
        "JWT_SECRET is missing"
      );

    }




    const decoded =
      jwt.verify(
        token,
        secret
      ) as {

        id:string;

        email:string;

        role:
        "user" |
        "owner" |
        "admin";

      };




    req.user = {

      _id: decoded.id as any,

      email: decoded.email,

      role: decoded.role,

    };




    next();



  } catch(error:any) {


    return res.status(401).json({

      success:false,

      message:
        "Invalid or expired token",

    });


  }

};



export default authMiddleware;