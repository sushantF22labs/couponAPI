import { NextFunction, Request, Response } from "express";
interface Data {
  couponCode: number;
  expiry: string;
  title: string;
  description: string[];
  paymentMode: string;
  discount: number;
}
const checkAllFields = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const data: Data = req.body;
  if (data.couponCode &&data.description && data.discount && data.expiry && data.paymentMode && data.title) {
    console.log(data);
    next();
  } else {
    res.status(400).json("fill all the fields");
  }
};

export default checkAllFields;
