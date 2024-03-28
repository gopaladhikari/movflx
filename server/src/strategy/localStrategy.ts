import passport from "passport";
import { User } from "../models/user.model";
import { Strategy as LocalStrategy } from "passport-local";

export const initialzeLocalStrategy = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (email, password, done) {
        try {
          const user = await User.findOne({ email });

          if (!user) return done(null, false);

          const isPasswordCorrect = await user.comparePassword(password);

          if (!isPasswordCorrect) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
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
