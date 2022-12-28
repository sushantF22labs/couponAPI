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
import CouponModel from "./coupon.model.js";
import checkAllFields from "./couponFields.js";
const couponRouter = express.Router();
couponRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let skip = Number(req.query.skip);
    let limit = Number(req.query.limit);
    try {
        if (req.query.title && req.query.couponCode) {
            const data = yield CouponModel.find({
                $and: [
                    { title: { $regex: req.query.title } },
                    { couponCode: { $regex: req.query.couponCode } },
                ],
            });
            res.send({ data: data });
        }
        else if (req.query.title) {
            const data = yield CouponModel.find({
                title: { $regex: req.query.title },
            });
            res.send({ data: data });
        }
        else {
            let data = yield CouponModel.find().skip(skip).limit(limit);
            let count = yield CouponModel.find().count();
            res
                .status(200)
                .send({ data: data, message: "Getting data ", totalCount: count });
        }
    }
    catch (err) {
        console.log(err);
        res.status(204).send({ message: "data not found" });
    }
}));
couponRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let skip = Number(req.query.skip);
    let limit = Number(req.query.limit);
    try {
        const result = yield CouponModel.findById(req.params.id).skip(skip).limit(limit);
        const count = yield CouponModel.find().count();
        res
            .status(200)
            .send({ data: result, count: count, message: "Get data by id" });
    }
    catch (err) {
        res.status(400).send({ message: "data not found" });
    }
}));
couponRouter.post("/", checkAllFields, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { couponCode } = req.body;
    try {
        const checkCouponCode = yield CouponModel.findOne({
            couponCode: couponCode,
        });
        if (checkCouponCode === null) {
            const newData = yield CouponModel.create(req.body);
            res.status(201).send({ message: "Coupon created successfully", data: newData });
        }
        else {
            res.status(400).send({ message: "Coupon already exists" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ data: "check entered data once again" });
    }
}));
couponRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deletedData = yield CouponModel.findByIdAndDelete(req.params.id);
        res
            .status(202)
            .send({ message: "Coupon deleted successfully", data: deletedData });
    }
    catch (err) {
        console.log(err);
        res.status(204).send({ message: "Failed to delete" });
    }
}));
couponRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updatedData = yield CouponModel.findByIdAndUpdate(req.params.id, req.body);
        res
            .status(200)
            .send({ message: "Coupon updated successfully", data: updatedData });
    }
    catch (err) {
        console.log(err);
        res.status(204).send({ message: "error while updating" });
    }
}));
couponRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let changedData = yield CouponModel.findByIdAndUpdate(req.params.id, req.body);
        res
            .status(200)
            .send({ message: "Coupon updated successfully", data: changedData });
    }
    catch (err) {
        console.log(err);
        res.status(204).send({ message: "error while updating" });
    }
}));
export default couponRouter;
