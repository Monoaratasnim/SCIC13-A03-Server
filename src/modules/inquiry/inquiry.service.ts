import Inquiry from "./inquiry.model";

import {
  CreateInquiryInput,
} from "./inquiry.validation";

import Property from "../property/property.model";



/*
|--------------------------------------------------------------------------
| Create Inquiry
|--------------------------------------------------------------------------
*/

export const createInquiry = async (

  payload: CreateInquiryInput,

  senderId: string

) => {


  const property =
    await Property.findById(
      payload.property
    );



  if (!property) {

    throw new Error(
      "Property not found"
    );

  }



  const inquiry = await Inquiry.create({

    ...payload,

    sender: senderId,

    owner: property.owner,

    status: "pending",

  });



  return inquiry;

};







/*
|--------------------------------------------------------------------------
| Get Owner Received Inquiries
|--------------------------------------------------------------------------
*/

export const getOwnerInquiries = async (

  ownerId: string

) => {


  const inquiries = await Inquiry.find({

    owner: ownerId,

  })


    .populate(
      "property",
      "title images location price"
    )


    .populate(
      "sender",
      "name email phone avatar"
    )


    .populate(
      "owner",
      "name email phone avatar"
    )


    .sort({

      createdAt: -1,

    });



  return inquiries;

};









/*
|--------------------------------------------------------------------------
| Get User Sent Inquiries
|--------------------------------------------------------------------------
*/

export const getMyInquiries = async (

  userId: string

) => {


  const inquiries = await Inquiry.find({

    sender: userId,

  })


    .populate(
      "property",
      "title images location price"
    )


    .populate(
      "owner",
      "name email phone avatar"
    )


    .sort({

      createdAt: -1,

    });



  return inquiries;

};









/*
|--------------------------------------------------------------------------
| Update Inquiry Status
|--------------------------------------------------------------------------
| Only property owner can update
|--------------------------------------------------------------------------
*/

export const updateInquiryStatus = async (

  id: string,

  ownerId: string,

  status:
    | "pending"
    | "contacted"
    | "closed"

) => {



  const inquiry =

    await Inquiry.findOneAndUpdate(

      {

        _id: id,

        owner: ownerId,

      },


      {

        status,

      },


      {

        new:true,

      }

    )


      .populate(
        "property",
        "title images location price"
      )


      .populate(
        "sender",
        "name email phone avatar"
      )


      .populate(
        "owner",
        "name email phone avatar"
      );



  return inquiry;

};









/*
|--------------------------------------------------------------------------
| Get All Inquiries (Admin)
|--------------------------------------------------------------------------
*/

export const getAllInquiries = async () => {


  const inquiries = await Inquiry.find()


    .populate(
      "property",
      "title images location price"
    )


    .populate(
      "sender",
      "name email phone avatar"
    )


    .populate(
      "owner",
      "name email phone avatar"
    )


    .sort({

      createdAt:-1,

    });



  return inquiries;

};









/*
|--------------------------------------------------------------------------
| Delete Inquiry
|--------------------------------------------------------------------------
| Only property owner can delete
|--------------------------------------------------------------------------
*/

export const deleteInquiry = async (

  id:string,

  ownerId:string

) => {


  const inquiry =

    await Inquiry.findOneAndDelete({

      _id:id,

      owner:ownerId,

    });



  return inquiry;

};