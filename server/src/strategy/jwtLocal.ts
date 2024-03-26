import passport from "passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { env } from "../conf/env";
import { User } from "../models/user.model";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.accessTokenSecret,
};

export const jwtLocalStrategy = () => {
  passport.use(
    new Strategy(options, async function (payload, done) {
      console.log("payload", payload);
      try {
        const user = await User.findById(payload.id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
