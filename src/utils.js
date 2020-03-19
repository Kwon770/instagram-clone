import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import { ExtractJwt } from "passport-jwt";
// https://www.npmjs.com/package/jsonwebtoken
import jwt from "jsonwebtoken";

export const GenerateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "sketom77@instaclone.com",
    to: address,
    subject: "🔒 Login Secret for instagram-clone 🔒",
    html: `Hello! Your login secret it <strong>${secret}</strong>.<br/>Copy and Paste on the app/website to log in`
  };
  return sendMail(email);
};

// Return encrypted id string
export const GenerateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
