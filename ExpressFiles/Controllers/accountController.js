const User = require("../Schemas/accountModel");
const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../utils/catchAsynErrors");

// Find All Users
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    const features = new APIFeatures(User.find({}), req.query);
    const users = await features.mongooseQuery;
    res.status(200).json({
        status: "success",
        data: {
            length: users.length,
            users
        }
    })
});

// Create New User
exports.createUser = catchAsyncErrors(async(req,res,next)=>{
    const userData = req.body;
    const user = await User.create(userData);
    res.status(201).json({
        status: "success",
        data:{user}
    })
})

// Find User By ID
exports.getUser = catchAsyncErrors(async(req,res,next)=>{
    const features = new APIFeatures(User.findById(req.params.id), req.query);
    features.select();
    const user = await features.mongooseQuery

    if(user == null){
        return next(new AppError("User not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {user}
    })
})

// Edit User
exports.updateUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )
    
    if(!user){
        return next(new AppError("User not found", 404));
    }

    res.status(201).json({
        status: "success",
        message: "Updated Successfully",
        data: {user}
    })
})

// Update Password 
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    
    await user.save()

    res.status(201).json({
        status: "success",
        message: "Password updated successfully",
        data: {user}
    })
})

// Delete User
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findByIdAndDelete(
        req.params.id,
        req.body
    );

    if(!user){
        return next(new AppError("User not found", 404));      
    }

    res.status(201).json({
        status: "success",
        message: "Successfully Deleted"
    })
})