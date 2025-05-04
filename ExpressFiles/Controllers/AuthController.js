const {promisify} = require("util");
const Account = require("../Schemas/accountModel");
const AppError = require("../utils/AppError");
const catchAsyncErrors = require("../utils/catchAsynErrors");
const jwt = require("jsonwebtoken")
const NodeCache = require( "node-cache" );
const cache = new NodeCache();


exports.signup = catchAsyncErrors(async (req, res, next) =>{
    delete req.body.role;
    const account = await Account.create(req.body);

    const token = jwt.sign(
        {id: account._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )

    res.status(201).json({
        status: "success",
        token,
        account
    })
})

exports.login = catchAsyncErrors(async(req,res,next) => {
    const {userName, password} = req.body;
    if(!userName || !password){
        return next(new AppError("Please provide username and password", 400));
    }
    const account = await Account.findOne({userName}).select("+password");
    if(!account || !(await account.comparePassword(password))){
        return next(new AppError("Invalid Username or Password", 400));
    }
    const token = jwt.sign(
        {id: account._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )
    res.status(201).json({
        status: "success",
        token,
        account,
    })
})

exports.protect = catchAsyncErrors(async (req,res,next) => {
    if(!req.headers.authorization){
        return next(new AppError("Please log in first!",400));
    }
    const token = req.headers.authorization.split(' ')[1];
    
    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const {id, iat} = payload;
    
    const account = await Account.findById(id);
    if(!account){
        return next(new AppError("Token's user no longer exist",401));
    }
    
    new Date(jwt.decode(token).exp)/1000 > new Date()/1000 && next(new AppError("Password has been changed, please login again",401))

    req.account = account
    console.log(account)
    next();
})

exports.restrictTo = (...roles) => {
    return(req,res,next)=>{
        if(!roles.includes(req.account.userType)){
            return next(new AppError("You are not authorized to perform this action", 403))
        }
        next();
    }
}