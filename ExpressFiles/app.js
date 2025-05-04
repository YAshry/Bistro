// Express Libraries
"use strict"
const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const mongoose = require('mongoose');
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./Controllers/errorController");
const cors = require("cors");
const path = require("path")

// Routers
const menuRouter = require("./Routers/menuRouter");
const accountRouter = require("./Routers/accountRouter");
const bookingRouter = require("./Routers/bookingRouter");
const uploadRouter = require("./Routers/uploadFileRouter");
const commentRouter = require("./Routers/userCommentRouter");

dotenv.config({path: "config.env"});
const DB = process.env.DATABASE_URI
.replace("<user>", process.env.DATABASE_USERNAME)
.replace("<password>", process.env.DATABASE_PASSWORD)
.replace("<databasename>", process.env.DATABASE_NAME)

mongoose.connect(DB).then((data)=>{
    console.log(`Connected successfully to ${data.connection.host}`)
}).catch((err)=>console.log(err))

const app = express();

app.use(cors())
app.use(express.json());

if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname,"Images")));
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/bookings", bookingRouter);

app.all("*", (req,res,next)=>{
    next(new AppError("This route is not found on server", 404));
});

app.use(globalErrorHandler)

app.listen(4000,()=>{
    console.log(`Server has started on port ${4000}`);
})