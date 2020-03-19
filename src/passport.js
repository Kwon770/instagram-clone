import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { prisma } from "../generated/prisma-client";
// http://www.passportjs.org/packages/passport-jwt/
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
