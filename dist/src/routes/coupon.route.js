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
const couponRouter = express.Router();
import CouponModel from "../models/coupon.model.js";
// couponRouter.get("/:key", async (req: Request, res: Response) => {
//     console.log(req.params.key);
//     try {
//       const data = await CouponModel.find({
//         "$or":[
//             {"title":{$regex:req.params.key}}
//         ]
//       });
//      res.send({ data: data });
//     } catch {
//       res.status(204).send({ message: "data not found" });
//     }
//   });
couponRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { page, limit } = req.query;
    console.log(req.query.title);
    console.log(req.query.cuponCode);
    try {
        if (req.query.title && req.query.cuponCode) {
            const data = yield CouponModel.find({
                "$and": [
                    { "title": { $regex: req.query.title } }, { "cuponCode": { $regex: req.query.cuponCode } }
                ]
            });
            res.send({ data: data });
        }
        else {
            let data = yield CouponModel.find().skip(page).limit(limit);
            let count = yield CouponModel.find().count();
            res.status(200).send({ data: data, totalCount: count });
        }
    }
    catch (_a) {
        res.status(204).send({ message: "data not found" });
    }
}));
couponRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newData = yield CouponModel.create(req.body);
        res
            .status(201)
            .send({ message: "coupon created successfully", data: newData });
    }
    catch (_b) {
        res.status(424).send({ data: "error while creating" });
    }
}));
couponRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deletedData = yield CouponModel.findByIdAndDelete(req.params.id);
        res
            .status(202)
            .send({ message: "coupon deleted successfully", data: deletedData });
    }
    catch (_c) {
        res.status(204).send({ message: "error while deleting" });
    }
}));
couponRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updatedData = yield CouponModel.findByIdAndUpdate(req.params.id, req.body);
        res
            .status(200)
            .send({ message: "coupon updated successfully", data: updatedData });
    }
    catch (_d) {
        res.status(204).send({ message: "error while updating" });
    }
}));
couponRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let changedData = yield CouponModel.findByIdAndUpdate(req.params.id, req.body);
        res
            .status(200)
            .send({ message: "coupon updated successfully", data: changedData });
    }
    catch (_e) {
        res.status(204).send({ message: "error while updating" });
    }
}));
export default couponRouter;
