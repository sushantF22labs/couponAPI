var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
const cuponRouter = express.Router();
import CuponModel from '../models/cupon.model.js';
cuponRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { page, limit, cupon_code, title } = req.query;
    try {
        if (Object.keys(req.query).length > 0) {
            let data = yield CuponModel.find({ $or: [{ cuponCode: cupon_code }, { title: title }] }).skip(page).limit(limit);
            let count = yield CuponModel.find({ $or: [{ cuponCode: cupon_code }, { title: title }] }).count();
            res.status(200).send({ totalCount: count, data: data });
        }
        else {
            let data = yield CuponModel.find().skip(page).limit(limit);
            let count = yield CuponModel.find().count();
            res.status(200).send({ totalCount: count, data: data });
        }
    }
    catch (_a) {
        res.status(204).send({ message: 'data not found' });
    }
}));
cuponRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newData = yield CuponModel.create(req.body);
        res.status(201).send({ message: 'coupon created successfully', data: newData });
    }
    catch (_b) {
        res.status(424).send({ data: 'error while creating' });
    }
}));
cuponRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deletedData = yield CuponModel.findByIdAndDelete(req.params.id);
        res.status(202).send({ message: 'coupon deleted successfully', data: deletedData });
    }
    catch (_c) {
        res.status(204).send({ message: 'error while deleting' });
    }
}));
cuponRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updatedData = yield CuponModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ message: 'coupon updated successfully', data: updatedData });
    }
    catch (_d) {
        res.status(204).send({ message: 'error while updating' });
    }
}));
cuponRouter.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let changedData = yield CuponModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ message: 'coupon updated successfully', data: changedData });
    }
    catch (_e) {
        res.status(204).send({ message: 'error while updating' });
    }
}));
export default cuponRouter;
