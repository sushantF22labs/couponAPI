var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import couponRouter from './coupon/coupon.route.js';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/coupon", couponRouter);
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Coupon API Project",
            version: "1.0.0",
            description: "Coupon API with CRUD functionality"
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            }
        ],
    },
    apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
const server = app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose.set('strictQuery', true);
        yield mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB!");
    }
    catch (e) {
        console.log("something went wrong with db");
    }
    console.log(`Our server is running at port number ${PORT}`);
}));
export { server };
