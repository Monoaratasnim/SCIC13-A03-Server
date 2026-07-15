import dotenv from "dotenv";

dotenv.config();


import passport from "passport";

import "./config/passport";

import app from "./app";
import connectDB from "./config/db";



const PORT =
  process.env.PORT || 5000;



// Initialize Passport

app.use(
  passport.initialize()
);



const startServer = async () => {


  await connectDB();



  app.listen(
    PORT,
    () => {

      console.log(
        `Server running on port ${PORT}`
      );

    }
  );


};



startServer();