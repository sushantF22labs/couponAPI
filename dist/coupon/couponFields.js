const checkAllFields = (req, res, next) => {
    const data = req.body;
    if (data.couponCode && data.description && data.discount && data.expiry && data.paymentMode && data.title) {
        console.log(data);
        next();
    }
    else {
        res.status(400).json("fill all the fields");
    }
};
export default checkAllFields;
