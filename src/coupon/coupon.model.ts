import mongoose from "mongoose";
import { Data } from "./coupon.types";
const couponSchema = new mongoose.Schema(
  {
    couponCode: { type: Number, required: true, unique: true },
    expiry: { type: String, required: true },
    title: { type: String, required: true },
    description: [String],
    paymentMode: { type: String, required: true },
    discount: {
      percentage: { type: String, default: null },
      amount: { type: Number, default: null },
    },
  },
  {
    versionKey: false,
  }
);

const CouponModel = mongoose.model<Data>("coupon", couponSchema);
export default CouponModel;
