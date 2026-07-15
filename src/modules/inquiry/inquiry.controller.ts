import { Request, Response } from "express";
import { ZodError } from "zod";

import {
  createInquiry,
  getOwnerInquiries,
  getMyInquiries,
  getAllInquiries,
  deleteInquiry,
  updateInquiryStatus,
} from "./inquiry.service";

import {
  createInquirySchema,
} from "./inquiry.validation";

import Property from "../property/property.model";



/*
|--------------------------------------------------------------------------
| Create Inquiry
|--------------------------------------------------------------------------
*/

export const createInquiryController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Admin Cannot Send Inquiry
    |--------------------------------------------------------------------------
    */

    if (req.user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot send property inquiries",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate Request Body
    |--------------------------------------------------------------------------
    */

    const validatedData = createInquirySchema.parse(req.body);

    /*
    |--------------------------------------------------------------------------
    | Check Property
    |--------------------------------------------------------------------------
    */

    const property = await Property.findById(validatedData.property);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Prevent Owner From Sending Inquiry
    |--------------------------------------------------------------------------
    */

    if (property.owner.toString() === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot send inquiry for your own property",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Create Inquiry
    |--------------------------------------------------------------------------
    */

    const inquiry = await createInquiry(
      validatedData,
      req.user._id.toString()
    );

    return res.status(201).json({
      success: true,
      message: "Inquiry sent successfully",
      data: inquiry,
    });

  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to send inquiry",
    });
  }
};









/*
|--------------------------------------------------------------------------
| Get User Sent Inquiries
|--------------------------------------------------------------------------
*/

export const getMyInquiriesController = async (
  req: Request,
  res: Response
) => {


  try {


    if(!req.user){

      return res.status(401).json({

        success:false,

        message:"Unauthorized user",

      });

    }



    const inquiries =
      await getMyInquiries(
        req.user._id.toString()
      );



    return res.status(200).json({

      success:true,

      data:inquiries,

    });



  } catch(error){


    return res.status(500).json({

      success:false,

      message:"Failed to fetch inquiries",

    });


  }


};









/*
|--------------------------------------------------------------------------
| Get Owner Received Inquiries
|--------------------------------------------------------------------------
*/

export const getOwnerInquiriesController = async (
  req:Request,
  res:Response
)=>{


  try{


    if(!req.user){

      return res.status(401).json({

        success:false,

        message:"Unauthorized user",

      });

    }



    const inquiries =
      await getOwnerInquiries(
       req.user._id.toString()
      );



    return res.status(200).json({

      success:true,

      data:inquiries,

    });



  }catch(error){


    return res.status(500).json({

      success:false,

      message:"Failed to fetch inquiries",

    });


  }


};









/*
|--------------------------------------------------------------------------
| Update Inquiry Status
|--------------------------------------------------------------------------
*/

export const updateInquiryStatusController = async (

  req:Request,

  res:Response

)=>{


 try{


  if(!req.user){

    return res.status(401).json({

      success:false,

      message:"Unauthorized user",

    });

  }



  const {status}=req.body;



  const validStatus=[

    "pending",

    "contacted",

    "closed",

  ];



  if(!validStatus.includes(status)){


    return res.status(400).json({

      success:false,

      message:"Invalid inquiry status",

    });


  }





  const inquiry =
    await updateInquiryStatus(

      String(req.params.id),
    req.user._id.toString(),

      status

    );



  if(!inquiry){


    return res.status(404).json({

      success:false,

      message:"Inquiry not found",

    });


  }





  return res.status(200).json({

    success:true,

    message:
      "Inquiry status updated",

    data:inquiry,

  });



 }catch(error){


  return res.status(500).json({

    success:false,

    message:
      "Failed to update inquiry",

  });


 }


};









/*
|--------------------------------------------------------------------------
| Get All Inquiries Admin
|--------------------------------------------------------------------------
*/

export const getAllInquiriesController = async (

req:Request,

res:Response

)=>{


 try{


  const inquiries =
    await getAllInquiries();



  return res.status(200).json({

    success:true,

    data:inquiries,

  });



 }catch(error){


  return res.status(500).json({

    success:false,

    message:
      "Failed to fetch inquiries",

  });


 }


};









/*
|--------------------------------------------------------------------------
| Delete Inquiry
|--------------------------------------------------------------------------
*/

export const deleteInquiryController = async (

req:Request,

res:Response

)=>{


 try{


  if(!req.user){

    return res.status(401).json({

      success:false,

      message:"Unauthorized user",

    });

  }



  const inquiry =
    await deleteInquiry(

      String(req.params.id),

     req.user._id.toString()

    );



  if(!inquiry){


    return res.status(404).json({

      success:false,

      message:"Inquiry not found",

    });


  }





  return res.status(200).json({

    success:true,

    message:
      "Inquiry deleted successfully",

  });





 }catch(error){


  return res.status(500).json({

    success:false,

    message:
      "Failed to delete inquiry",

  });


 }


};