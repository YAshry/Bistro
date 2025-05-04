const Book = require("../Schemas/bookingModel");
const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../utils/catchAsynErrors");

// Get All Bookings
exports.getAllBookings = catchAsyncErrors(async(req,res,next)=>{
    const features = new APIFeatures(Book.find({}), req.query);
    const bookings = await features.mongooseQuery;
    res.status(200).json({
        status: "success",
        data: {
            length: bookings.length,
            bookings
        }
    })
});

// Create New Booking
exports.createBooking = catchAsyncErrors(async(req,res,next)=>{
    const bookData = req.body;
    const book = await Book.create(bookData);
    res.status(201).json({
        status: "success",
        data:{book}
    })
})

// Find Book By ID
exports.getBook = catchAsyncErrors(async(req,res,next)=>{
    const features = new APIFeatures(Book.findById(req.params.id), req.query);
    features.select();
    const book = await features.mongooseQuery

    if(book == null){
        return next(new AppError("Book not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {book}
    })
})

// Edit Book
exports.updateBook = catchAsyncErrors(async(req,res,next)=>{
    const book = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if(!book){
        return next(new AppError("Book not found", 404));
    }

    res.status(201).json({
        status: "success",
        message: "Updated Successfully",
        data: {book}
    })
})

// Delete Book
exports.deleteBook = catchAsyncErrors(async(req,res,next)=>{
    const book = await Book.findByIdAndDelete(
        req.params.id,
        req.body
    );

    if(!book){
        return next(new AppError("Book not found", 404));      
    }

    res.status(201).json({
        status: "success",
        message: "Successfully Deleted"
    })
})