import { Resend } from 'resend';
import { welcomeEmail } from './emails/WelcomeEmail.js';
import { resetPasswordEmail } from './emails/ResetPasswordEmail.js';


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email, username) => {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Hello ',
    html: welcomeEmail(username=username)
  });

  if (error) {
    return console.log(error);
  }

  console.log("Email Successfully Sent", data);
};

export const sendResetPassword = async (email, username, resetLink ) => {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'AI Travel Planner - Password Reset Request',
    html: resetPasswordEmail (username, resetLink)
  });

  if (error) {
    return console.log(error);
  }

  console.log("Email Successfully Sent", data);
};