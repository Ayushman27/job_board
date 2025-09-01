import { transporter } from '../config/email.js';


export const sendEmail = async ({ to, subject, html, text }) => {
return transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html, text });
};