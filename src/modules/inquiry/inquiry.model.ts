import mongoose, {
  Schema,
  Document,
} from "mongoose";



export interface IInquiry extends Document {

  property: mongoose.Types.ObjectId;


  sender: mongoose.Types.ObjectId;


  owner: mongoose.Types.ObjectId;


  message: string;


  phone: string;


  status:
    | "pending"
    | "contacted"
    | "closed";


  createdAt: Date;


  updatedAt: Date;

}





const inquirySchema =
  new Schema<IInquiry>(

    {


      property: {

        type: Schema.Types.ObjectId,

        ref: "Property",

        required: true,

      },




      sender: {

        type: Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },




      owner: {

        type: Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },




      message: {

        type: String,

        required: true,

        trim: true,

      },




      phone: {

        type: String,

        required: true,

        trim: true,

      },




      status: {

        type: String,

        enum: [
          "pending",
          "contacted",
          "closed",
        ],

        default: "pending",

      },


    },


    {

      timestamps: true,

    }

  );





const Inquiry =
  mongoose.model<IInquiry>(
    "Inquiry",
    inquirySchema
  );



export default Inquiry;