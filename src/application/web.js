import express from "express"
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

dotenv.config();

export const web = express();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sekolah',
      version: '1.0.0',
      description: 'Dokumentasi otomatis dari route Express',
    },
  },
   apis: ['../route/public-api.js']

};

web.use(express.json());
web.use(cookieParser())
web.use(publicRouter);
web.use(userRouter)
web.use(errorMiddleware);

