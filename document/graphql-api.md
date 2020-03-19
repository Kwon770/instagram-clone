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

## Manage Token with PassportJS

[Passport Web](http://www.passportjs.org/packages/passport-jwt/)

### Setup (Using JWT)

```bash
$ yarn add passport passport-jwt
```

```js
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
```

### Usage

```env
# .env
JWT_SECRET="vSdkCnflCQmGeLwDMYeaD0vfnDAVVXJK
```

```js
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // The parameter string to encrypt
  secretOrKey: process.env.JWT_SECRET
};

// payload is an object containing the decoded JTW
// done is the fuction what will be executed when we found user
// done(error, user)
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    // user !== null : found user
    if (user !== null) {
      return done(null, user);
    }
    // done(error, user)
    else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

passport.use(new Strategy(jwtOptions, verifyUser));
```

## Generate JWT Token with JsonWebToken

[Document from NPM](https://www.npmjs.com/package/jsonwebtoken)

### Setup & Usage

```bashh
$ yarn add jsonwebtoken
```

```js
import jwt from "jsonwebtoken";
export const GenerateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
```
