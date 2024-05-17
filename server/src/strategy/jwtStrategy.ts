import {
	ExtractJwt,
	Strategy as JwtStrategy,
	StrategyOptions,
} from "passport-jwt";
import { TokenExpiredError } from "jsonwebtoken";

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
			const user = await User.findById(payload._id);
			if (!user) return done(null, false);
			return done(null, user);
		} catch (error) {
			if (error instanceof TokenExpiredError)
				return done("Token expired", false);
			return done(error, false);
		}
	})
);
