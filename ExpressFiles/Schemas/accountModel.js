const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const accountModel = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please provide your first name'],
        trim: true,
    },
    lastName:{
        type: String,
        required: [true, 'Please provide your last name'],
        trim: true,
    },
    userName:{
        type: String,
        required: [true, 'Please provide your username'],
        trim: true,
        unique: [true, 'Username already exists!'],
    },
    email:{
        type: String,
        trim: true,
        required: [true, 'You must specify an email'],
        validate: [validator.isEmail, 'Wrong email format'],
        unique: [true, 'Email already exists!'],
    },
    password:{
        type: String,
        trim: true,
        select: false,
        required: [true, 'You must specify a password'],
        minLength: [8, 'Password must be at least 8 characters'],
    },
    passwordConfirm:{
        type: String,
        trim: true,
        required: [true, 'You must confirm your password'],
        validate: {
            validator: function (value) {
                return this.password === value;
            },
            message: "Passwords don't match!",
        },
    },
    userType:{
        type: String,
        enum: {
        values: ['user', 'admin'],
        message: 'Role must be either user or admin!',
        },
        default: 'user',
    },
    profileImg:{
        type: String,
        default:"defaultUserProfileImage.png",
    },
    profileBackgroundImg:{
        type: String,
        default:"adminProfileBgImage.jpg",
    },
    
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
});

accountModel.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});
  
accountModel.methods.comparePassword = function (canditatePassword){
    return bcrypt.compare(canditatePassword, this.password);
}

accountModel.methods.passwordChangedAfter = function (iat){
    if(!this.passwordChangedAt){
      const timeStamp = this.passwordChangedAt.getTime();
      return timeStamp > iat
    }
    return false
}

accountModel.methods.generateRandomResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetToken = hashedToken;
    this.passwordResetTokenExpire = Date.now() + 10/*minute*/ * 60 */*seconds*/ 1000/*mille seconds*/;
  
    return resetToken;
}

const Account = mongoose.model('Account', accountModel);
module.exports = Account;