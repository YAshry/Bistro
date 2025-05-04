const AppError = require("../utils/AppError")

const reportErrorDev = (res, error) => {
    res.status(error.statusCode).json({
        stauts: error.status,
        error,
        message: error.message,
        stack: error.stack
    })
}

const reportErrorProd = (res, error) => {
    // if error is operational, error from our end
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })
    }
    else{
        res.status(error.statusCode).json({
            status: error.status,
            message: "Something went wrong :("
        })
    }
}

const handleValidationErrorDB = (error) => {
    return new AppError(error.message, 400);
}

const handleCastError = (error) => {
    return new AppError(`Invalid ${error.path}: ${error.value}`, 400);
}

const handleDuplicateKey = (error) => {
    return new AppError(`Name ${error.keyValue.name} already exists`, 400);
}

const handleInvalidJWTError = (error) =>{
    return new AppError(`Invalid token, please login again`, 400);
}

const handleExpiredJWTError = (error) =>{
    return new AppError(`Expired token, please login again`, 400);
}

module.exports = (error, req, res, next)=>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";

    if(process.env.NODE_ENV === "development"){
        reportErrorDev(res, error);
    }
    else if(process.env.NODE_ENV === "production"){
        let err;
        if(error.name === "ValidationError"){
            err = handleValidationErrorDB(error)
        }
        if(error.name === "CastError"){
            err = handleCastError(error)
        }
        if(error.code === 11000/*duplicate key*/){
            err = handleDuplicateKey(error)
        }
        if (error.name === "JsonWebTokenError"){
            err = handleInvalidJWTError(error);
        }
        if (error.name === "TokenExpiredError"){
            err = handleExpiredJWTError(error);
        }
        reportErrorProd(res, err);
    }
}