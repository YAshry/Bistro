const Comment = require("../Schemas/userCommentModel");
const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../utils/catchAsynErrors");

// Find All Comments
exports.getAllComments = catchAsyncErrors(async(req,res,next)=>{
    const features = new APIFeatures(Comment.find({}), req.query);
    const comments = await features.mongooseQuery;
    res.status(200).json({
        status: "success",
        data: {
            length: comments.length,
            comments
        }
    })
});

// Create New Comment
exports.createComment = catchAsyncErrors(async(req,res,next)=>{
    const commentData = req.body;
    const comment = await Comment.create(commentData);
    res.status(201).json({
        status: "success",
        data:{comment}
    })
})

// Find Comment By ID
exports.getComment = catchAsyncErrors(async(req,res,next)=>{
    const features = new APIFeatures(Comment.findById(req.params.id), req.query);
    features.select();
    const comment = await features.mongooseQuery

    if(comment == null){
        return next(new AppError("Comment not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {comment}
    })
})

// Edit Comment
exports.updateComment = catchAsyncErrors(async(req,res,next)=>{
    const comment = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if(!comment){
        return next(new AppError("Comment not found", 404));
    }

    res.status(201).json({
        status: "success",
        message: "Updated Successfully",
        data: {comment}
    })
})

// Delete Comment
exports.deleteComment = catchAsyncErrors(async(req,res,next)=>{
    const commentData = req.body;
    const comment = await Comment.findOneAndDelete(commentData);

    if(!comment){
        return next(new AppError("Comment not found", 404));      
    }

    res.status(201).json({
        status: "success",
        message: "Successfully Deleted"
    })
})