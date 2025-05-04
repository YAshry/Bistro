class AppError extends Error{
    constructor(message, statusCode){
        super(message); //call parent error constructor with message
        this.statusCode = statusCode; // add status code property on the object
        this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;