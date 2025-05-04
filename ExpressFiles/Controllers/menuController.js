const Menu = require("../Schemas/menuModel");
const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../utils/catchAsynErrors");

// Get All Menu
exports.getAllMenu = catchAsyncErrors(async(req,res,next)=>{
    const features = new APIFeatures(Menu.find({}), req.query);
    const menu = await features.mongooseQuery;
    res.status(200).json({
        status: "success",
        data: {
            length: menu.length,
            menu
        }
    })
});

// Create New Menu
exports.createMenu = catchAsyncErrors(async(req,res,next)=>{
    const menuData = req.body;
    const menu = await Menu.create(menuData);

    res.status(201).json({
        status: "success",
        data:{menu}
    })
})

// Find Menu By ID
exports.getMenu = catchAsyncErrors(async(req,res,next)=>{
    const features = new APIFeatures(Menu.findById(req.params.id), req.query);
    features.select();
    const menu = await features.mongooseQuery

    if(menu == null){
        return next(new AppError("Menu not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {menu}
    })
})

// Edit Menu
exports.updateMenu = catchAsyncErrors(async(req,res,next)=>{
    const menu = await Menu.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if(!menu){
        return next(new AppError("Menu not found", 404));
    }

    res.status(201).json({
        status: "success",
        message: "Updated Successfully",
        data: {menu}
    })
})

// Delete Menu
exports.deleteMenu = catchAsyncErrors(async(req,res,next)=>{
    const menu = await Menu.findByIdAndDelete(
        req.params.id,
        req.body
    );

    if(!menu){
        return next(new AppError("Menu not found", 404));      
    }

    res.status(201).json({
        status: "success",
        message: "Successfully Deleted"
    })
})