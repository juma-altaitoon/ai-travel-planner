import { welcomeEmail } from "./emails/WelcomeEmail.js";
import transporter from "../config/nodemailer.js";
import { resetPasswordEmail } from "./emails/ResetPasswordEmail.js";


const welcomeText =(username) => {
    const frontendUrl = process.env.FRONTEND_URL;
    return (`
Welcome to AI Travel Planner, ${username}!

Hello ${username},

Welcome aboard! You’ve just joined AI Travel Planner, the planner that turns your dream trips into reality with just a few clicks.

Get Started: ${frontendUrl}/login

Happy exploring,  
The AI Travel Planner Team`
)
}

const resetPasswordText = (username, resetPasswordLink) => { 
    
    return (`
Reset Your Password

Hi ${username},

Someone recently requested a password change for your AI Travel Planner account.  
If this was you, click the link below to set a new password:

Reset Password: ${resetPasswordLink}

If you didn’t request this, just ignore and delete this email.  
Your account is safe and no changes were made.

Happy exploring,  
The AI Travel Planner Team
`)
}


export const sendWelcomeEmail = async (email, username) => {
    const mailOptions = {
        from: `"AI Travel Planner" <${process.env.BASE_EMAIL}>`,
        to: email,
        subject: "Welcome ",
        text: welcomeText(username),
        html: welcomeEmail(username=username)
    };
    try {
        const data = await transporter.sendMail(mailOptions);
        console.log("Email Successfully Sent", data.messageId);
    } catch (error) {
        console.error("Error Sending welcome email", error.message);
    }
};

export const sendResetPassword = async (email, username, resetLink ) => {
    const mailOptions = {
        from: `"AI Travel Planner" <${process.env.BASE_EMAIL}>`,
        to: email,
        subject: "Password Reset Request",
        text: resetPasswordText(username, resetLink),
        html: resetPasswordEmail(username=username, resetLink)
    };
    try {
        const data = await transporter.sendMail(mailOptions);
        console.log("Email Successfully Sent", data.messageId);
    } catch (error) {
        console.error("Error sending reset password email", error.message);
    }
};

