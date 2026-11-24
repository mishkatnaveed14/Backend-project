// require("dotenv").config({path: './env'}) this is we dont use because of common modules and change the sequnce and loooks odd
import { configDotenv } from "dotenv";
import connectDB from "./db/index.db.js";

configDotenv({
  path: "./.env",
});
connectDB()
//   .then((result) => {
//     app.listen(process.env.PORT || 3000, () => {
//       console.log(`App is running on port ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(`mongo db connection error failed !!! ${console.error(err)}`);
//   });

// basic approach using iify
// import express from "express";
// const app = express()(async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}`);
//     app.on("error", (error) => {
//       console.log("Error", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is exporting on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("ERROR", error);
//     throw error;
//   }
// })();
