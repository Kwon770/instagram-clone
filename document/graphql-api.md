# Graphql Api

## Send Mail with NodeMailer and SendGrid

### Setup

```bash
$ yarn add nodemailer
$ yarn add nodemailer-sendgrid-transport
```

### Usage

```js
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const sendMail = email => {
  const options = {
    auth: {
      // process.env.SOMETHING : get SOMETHING from .env by dotenv
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "sckwon770@instaclone.com",
    to: address,
    subject: "🔒Login Secret for instagram-clone 🔒",
    html: `Hello! Your login secret it ${secret}.<br/>Copy and Paste on the app/website to log in`
  };
  return sendMail(email);
};
```

```env
# .env

SENDGRID_USERNAME="sckwon"
SENDGRID_PASSWORD="fubdoB-3fekqy-jurbih"
```
