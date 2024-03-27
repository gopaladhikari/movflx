import passport from "passport";
import { User } from "../models/user.model";
import { Strategy as LocalStrategy } from "passport-local";

export const initialzeLocalStrategy = () => {
  passport.use(
    new LocalStrategy(async function (email, password, done) {
      console.log({ email, password });
      try {
        const user = await User.findOne({ email });

        if (!user) return done(null, "User not found");

        console.log({ user });

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) return done(null, "Invalid email or password");

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    console.log("passport serializeUser user", user);
    // @ts-expect-error id is available
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  });
};
