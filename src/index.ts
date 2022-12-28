import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
// custom imports
import couponRouter from "./coupon.route.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
const PORT:any = process.env.PORT || 8000;

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
      description:"Coupon API with CRUD functionality"
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
  apis:['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options)
app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(swaggerSpec))



const server =  app.listen(PORT, async () => {
  try {
    
    mongoose.set('strictQuery', true);
    // @ts-ignore
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB!");
  } catch (e) {
    console.log("something went wrong with db");
  }
  console.log(`http://localhost:${PORT}`);
});

export{server};