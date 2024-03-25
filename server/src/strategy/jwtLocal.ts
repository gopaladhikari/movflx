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
        User.findOne({ id: payload.sub }, function (err: unknown, user: unknown) {
          if (err) return done(err, false);
          else if (user) return done(null, user);
          else return done(null, false);
        });
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err: unknown, user: boolean | Express.User | null | undefined) {
      done(err, user);
    });
  });
};
