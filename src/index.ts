import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import couponRouter from './coupon/coupon.route.js';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
const PORT:number|string = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/coupon", couponRouter);

app.get("/",(req:express.Request,res:express.Response)=>{
  res.send("welcome")
})

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
    await mongoose.connect("mongodb://mongo:MongoSushant0324@ac-avzb160-shard-00-00.neqduj8.mongodb.net:27017,ac-avzb160-shard-00-01.neqduj8.mongodb.net:27017,ac-avzb160-shard-00-02.neqduj8.mongodb.net:27017/coupon?ssl=true&replicaSet=atlas-t46owy-shard-0&authSource=admin&retryWrites=true&w=majority");
    console.log("Connected to MongoDB!");
  } catch (e) {
    console.log("something went wrong with db");
  }
  console.log(`Our server is running at port number ${PORT}`);
});

export{server};