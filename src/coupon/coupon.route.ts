import express, { NextFunction, Request, Response } from "express";
const couponRouter = express.Router();
import CouponModel from "./coupon.model.js";
import checkAllFields from "./couponFields.js";
 import { Data } from "./coupon.types";


  //  const checkAllFields=(req: Request, res:Response, next: NextFunction)=>void
/**
 * @swagger
 * tags:
 *   name: Coupon
 *   description: The Coupon API with CRUD operation
 */

/**
 * @swagger
 * /coupon:
 *   get:
 *      summary: List of all the coupon
 *      tags: [coupon]
 *      parameters:
 *      - name: page
 *        default: 1
 *        in: query
 *        required: true
 *        type: string
 *      - name: limit
 *        default: 5
 *        in: query
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: List of all the Coupons
 *          content:
 *            application/json:
 *              schema:
 *                 type: array
 *        204:
 *          description: Data not found
 */

couponRouter.get("/", async (req: Request, res: Response) => {
  let skip: number =Number(req.query.skip);
  let limit: number =Number(req.query.limit);
 
  try {
    if (req.query.title && req.query.couponCode) {
      const data= await CouponModel.find({
        $and: [
          { title: { $regex: req.query.title } },
          { couponCode: { $regex: req.query.couponCode } },
        ],
      });
      res.send({ data: data });
    } else if (req.query.title) {
      const data = await CouponModel.find({
        title: { $regex: req.query.title },
      });
      res.send({ data: data });
    } else {
   
      let data = await CouponModel.find().skip(skip).limit(limit);
      let count:number = await CouponModel.find().count();
      res
        .status(200)
        .send({ data: data, message: "Getting data ", totalCount: count });
    }
  } catch (err) {
    console.log(err);
    res.status(204).send({ message: "data not found" });
  }
});


/**
 * @swagger
 * /coupon/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The coupon ID.
 *     description: Get a coupon by id
 *     responses:
 *       200:
 *         description: Returns the requested coupon
 *       204:
 *         description: Data not found
 */

couponRouter.get("/:id", async (req, res) => {
  let skip: number =Number(req.query.skip);
  let limit: number =Number(req.query.limit);

  try {
    const result: any = await CouponModel.findById(req.params.id).skip(skip).limit(limit);
    const count: number = await CouponModel.find().count();
    res
      .status(200)
      .send({ data: result, count: count, message: "Get data by id" });
  } catch (err) {
    // console.log(err);
    res.status(400).send({ message: "data not found" });
  }
});
//POST 

/**
 * @swagger
 * /coupon:
 *   post:
 *      summary: Add new coupon details
 *      description: Create New coupon
 *      required: true
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   couponCode:
 *                     type: string
 *                   expiry:
 *                     type: string
 *                   title:
 *                     type : string
 *                   description:
 *                     type: string
 *                   paymentMode:
 *                     type: string
 *                   discount:
 *                     type: object
 *                     properties:
 *                        percentage:
 *                          type: string
 *                        amount:
 *                          type: string
 *      responses:
 *        201:
 *          description: The list of all the some
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *        400:
 *          description: Either name, email or password does not fulfill the requiremet
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *
 */

couponRouter.post("/",checkAllFields,async(req, res) => {
  let { couponCode } = req.body;
  try {
    const checkCouponCode :Data|null = await CouponModel.findOne({
      couponCode: couponCode,
    });

    if (checkCouponCode === null) {
      const newData = await CouponModel.create(req.body);
      res.status(201).send({ message: "Coupon created successfully", data: newData });
    } else {
      res.status(400).send({ message: "Coupon already exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ data: "check entered data once again" });
  }
});

//DELETE

/**
 * @swagger
 * /coupon/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The coupon ID.
 *     description: Delete a coupon by id
 *     responses:
 *       200:
 *         description: Returns the requested coupon
 *       204:
 *         description: error while deleting
 */

couponRouter.delete("/:id", async (req, res) => {
  try {
    let deletedData = await CouponModel.findByIdAndDelete(req.params.id);
    res
      .status(202)
      .send({ message: "Coupon deleted successfully", data: deletedData });
  } catch (err) {
    console.log(err);
    res.status(204).send({ message: "Failed to delete" });
  }
});

//PUT

/**
 * @swagger
 * /coupon/{id}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The coupon ID.
 *      - in: body
 *        name: coupon
 *        description: Update coupon
 *        schema:
 *          type: object
 *     responses:
 *       201:
 *         description: Coupon updated successfully
 *       204:
 *         description: Error while updating
 */

couponRouter.put("/:id", async (req, res) => {
  try {
    let updatedData = await CouponModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .send({ message: "Coupon updated successfully", data: updatedData });
  } catch (err) {
    console.log(err);
    res.status(204).send({ message: "error while updating" });
  }
});

//PATCH

/**
 * @swagger
 * /coupon/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The coupon ID.
 *      - in: body
 *        name: coupon
 *        description: Update coupon
 *        schema:
 *          type: object
 *     responses:
 *       201:
 *         description: Coupon updated successfully
 *       204:
 *         description: Error while updating
 */

couponRouter.patch("/:id", async (req, res) => {
  try {
    let changedData = await CouponModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .send({ message: "Coupon updated successfully", data: changedData });
  } catch (err) {
    console.log(err);
    res.status(204).send({ message: "error while updating" });
  }
});

export default couponRouter;
