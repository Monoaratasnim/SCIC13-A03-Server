import express from "express";
import cors from "cors";
import router from "./routes";
import passport from "passport";

import "./config/passport";


const app = express();


// Passport initialization
app.use(
  passport.initialize()
);



app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:3000",

    credentials:true,
  })
);



app.use(
  express.json()
);





app.get(
  "/",
  (req, res) => {

    res.json({

      success:true,

      message:
        "PropertyNest API is running",

    });

  }
);







/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api",
  router
);




export default app;