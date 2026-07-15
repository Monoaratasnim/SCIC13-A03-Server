import mongoose, { Schema, Document } from "mongoose";


export interface IProperty extends Document {

  title: string;

  shortDescription: string;

  description: string;


  propertyType:
    | "Apartment"
    | "Villa"
    | "Duplex"
    | "Office"
    | "Shop"
    | "Warehouse"
    | "Showroom"
    | "Land";


  category:
    | "Residential"
    | "Commercial";


  location: string;


  price: number;


  // Residential Details

  bedrooms?: number;

  bathrooms?: number;



  // Common

  area?: number;



  // Commercial Details

  businessType?: string;

  floorNumber?: number;

  totalFloors?: number;

  parking?: string;

  lift?: boolean;

  electricityBackup?: boolean;



  images: string[];


  rating?: number;


  owner: mongoose.Types.ObjectId;


  status:
    | "available"
    | "sold";


  createdAt: Date;

  updatedAt: Date;

}




const propertySchema =
  new Schema<IProperty>(

    {


      title: {

        type: String,

        required: true,

        trim: true,

      },




      shortDescription: {

        type: String,

        required: true,

        maxlength: 150,

      },




      description: {

        type: String,

        required: true,

      },





      propertyType: {

        type: String,

        enum: [

          "Apartment",

          "Villa",

          "Duplex",

          "Office",

          "Shop",

          "Warehouse",

          "Showroom",

          "Land",

        ],

        required: true,

      },





      category: {

        type: String,

        enum: [

          "Residential",

          "Commercial",

        ],

        required: true,

      },





      location: {

        type: String,

        required: true,

        trim: true,

      },





      price: {

        type: Number,

        required: true,

        min: 0,

      },





      // Residential Fields


      bedrooms: {

        type: Number,

      },



      bathrooms: {

        type: Number,

      },





      // Common Field


      area: {

        type: Number,

      },






      // Commercial Fields


      businessType: {

        type: String,

      },



      floorNumber: {

        type: Number,

      },



      totalFloors: {

        type: Number,

      },



      parking: {

        type: String,

      },



      lift: {

        type: Boolean,

        default: false,

      },



      electricityBackup: {

        type: Boolean,

        default: false,

      },






      images: {

        type: [String],

        default: [],

      },






      rating: {

        type: Number,

        default: 0,

        min: 0,

        max: 5,

      },






      owner: {

        type: Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },






      status: {

        type: String,

        enum: [

          "available",

          "sold",

        ],

        default: "available",

      },



    },


    {

      timestamps: true,

    }

  );







// Search optimization

propertySchema.index({

  title: "text",

  location: "text",

  description: "text",

});







const Property =

  mongoose.model<IProperty>(

    "Property",

    propertySchema

  );






export default Property;