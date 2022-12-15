import mongoose from "mongoose";
const cuponSchema = new mongoose.Schema({
    cuponCode: { type: String, required: true },
    expiry: { type: String, required: true },
    title: { type: String, required: true },
    description: [String],
    paymentMode: { type: String, required: true },
    discount: {
        percentage: { type: String, default: null },
        amount: { type: String, default: null }
    },
}, {
    versionKey: false
});
const CuponModel = mongoose.model('cupon', cuponSchema);
export default CuponModel;
