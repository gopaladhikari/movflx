import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";

import passport from "passport";
import { User } from "../models/user.model";
import { env } from "../conf/env";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwtSecret,
};

passport.use(
  new JwtStrategy(options, async function (payload, done) {
    try {
      const user = await User.findById(payload.id);

      if (!user) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
