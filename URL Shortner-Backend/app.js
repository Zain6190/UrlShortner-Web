import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
dotenv.config("./.env");
import shortUrlSchema from "./src/models/short_url.model.js";
import short_url from "./src/routes/short_url.route.js";
import { redirectShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utis/errorHandle.js";
import cors from "cors";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/create", short_url);

app.get("/:id", redirectShortUrl)
app.use(errorHandler)
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

//GET - Redirect
//POST - Create short url
