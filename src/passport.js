import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import passport from "passport";
import JwtStrategy from "passport-jwt";

const jwtOptions = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  // The parameter string to encrypt
  secret: process.env.JWT_SECRET
};

// dont is the fuction what will be executed when we found user
const verifyUser = (payload, done) => {
  try {
  } catch {}
};

//
passport.use(new JwtStrategy(jwtOptions));
