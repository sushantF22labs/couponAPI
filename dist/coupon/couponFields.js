const checkAllFields = (req, res, next) => {
    const data = req.body;
    if (data) {
        console.log(data);
        next();
    }
    else {
        res.status(406).json("fill all the fields");
    }
};
export { checkAllFields };
