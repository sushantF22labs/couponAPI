import { NextFunction } from "express";
interface Data {
  couponCode:number,
  expiry:string,
  title:string,
  description:string[],
  paymentMode:string,
  discount:number,
}
const checkAllFields = (req: Request, res:Response, next: NextFunction)=>{
  const data = req.body;
  // const { couponCode, expiry, title, description, paymentMode, discount } = req.body;
  // console.log(couponCode, expiry, title, description,paymentMode,discount);
  // if (couponCode && expiry && title && description && paymentMode && discount) {
    // console.log(couponCode, expiry, title, description, paymentMode, discount);
    if(data ){
      console.log(data);
    next();
  } else {
    // @ts-ignore
    res.status(406).json("fill all the fields");
  }
};

export { checkAllFields };
