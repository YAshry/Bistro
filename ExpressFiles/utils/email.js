const nodemailer = require("nodemailer");

module.exports = async (mailOption) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_EMAIL_PASSWORD.split('-').join(" ")
        }
    })

    const mailOpts = {
        from: "Bistro",
        to: mailOption.to,
        subject: "Reset Password",
        text: mailOption.message
    }
    return await transporter.sendMail(mailOpts);
}