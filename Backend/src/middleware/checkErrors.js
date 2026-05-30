const { validationResult } = require("express-validator");

function checkErrors(req,res,next) {
    const result = validationResult(req);
    if (!result.isEmpty() ){

        return res.status(401).json({ errors: result.array() });
    };

    next();


};


module.exports = {checkErrors};
