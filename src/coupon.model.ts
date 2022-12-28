import mongoose from "mongoose";

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

const CouponModel = mongoose.model("coupon", couponSchema);
export default CouponModel;
