import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";

import passport from "passport";
import { User } from "../models/user.model";
import { env } from "../conf/env";

console.log({ env });

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwtSecret,
};

export const initializeJwtStrategy = () => {
  passport.use(
    new JwtStrategy(options, async function (payload, done) {
      try {
        console.log({ payload });
        const user = await User.findOne({ id: payload._doc._id });

        console.log({ user });

        if (!user) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
  passport.serializeUser((user, done) => {
    // @ts-expect-error _id is available
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
