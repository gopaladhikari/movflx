import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.model";

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
