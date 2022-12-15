import express, { Request, Response } from "express";

const couponRouter = express.Router();
import CouponModel from "../models/coupon.model.js";


couponRouter.get("/", async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  console.log(req.query.title)
  console.log(req.query.cuponCode)
  try {
     if(req.query.title && req.query.cuponCode){
        const data = await CouponModel.find({
            "$and":[
                {"title":{$regex:req.query.title}},{"cuponCode":{$regex:req.query.cuponCode}}
            ]
          });
         res.send({ data: data });
     }else{
         let data = await CouponModel.find().skip(page).limit(limit);
         let count = await CouponModel.find().count();
         res.status(200).send({  data: data,totalCount: count });
     }
  } catch {
    res.status(204).send({ message: "data not found" });
  }
});


couponRouter.post("/", async (req: Request, res: Response) => {
  try {
    let newData = await CouponModel.create(req.body);
    res
      .status(201)
      .send({ message: "coupon created successfully", data: newData });
  } catch {
    res.status(424).send({ data: "error while creating" });
  }
});

couponRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    let deletedData = await CouponModel.findByIdAndDelete(req.params.id);
    res
      .status(202)
      .send({ message: "coupon deleted successfully", data: deletedData });
  } catch {
    res.status(204).send({ message: "error while deleting" });
  }
});

couponRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    let updatedData = await CouponModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .send({ message: "coupon updated successfully", data: updatedData });
  } catch {
    res.status(204).send({ message: "error while updating" });
  }
});

couponRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    let changedData = await CouponModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .send({ message: "coupon updated successfully", data: changedData });
  } catch {
    res.status(204).send({ message: "error while updating" });
  }
});

export default couponRouter;
