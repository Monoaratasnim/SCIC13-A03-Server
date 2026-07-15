import mongoose, {
  Schema,
  Document,
  Types,
} from "mongoose";



export interface IUser extends Document {

  name: string;

  email: string;

  password?: string;

  avatar?: string;

  role:
    | "user"
    | "owner"
    | "admin";


  createdAt: Date;

  updatedAt: Date;

}




const userSchema =
new Schema<IUser>(

{

  name: {

    type: String,

    required: true,

    trim: true,

  },



  email: {

    type: String,

    required: true,

    unique: true,

    lowercase: true,

    trim: true,

  },



  password: {

    type: String,

    required: false,

  },



  avatar: {

    type: String,

    default: "",

  },



  role: {

    type: String,

    enum: [

      "user",

      "owner",

      "admin",

    ],

    default: "user",

  },


},

{
  timestamps: true,
}

);





const User =
mongoose.model<IUser>(
  "User",
  userSchema
);



export default User;