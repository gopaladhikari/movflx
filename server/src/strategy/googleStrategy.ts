// ! It stays here it is not used.

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model";
import { env } from "../conf/env";

passport.use(
	new GoogleStrategy(
		{
			clientID: env.googleClientId,
			clientSecret: env.googleClientSecret,
			callbackURL: env.bakendUri.concat(
				"/api/v1/users/auth/google/callback"
			),
			scope: ["profile email"],
		},
		async function (accessToken, refreshToken, profile, done) {
			try {
				console.log("profile: ", profile.emails);

				const existedUser = await User.findOne({
					email: profile.emails?.[0].value,
				});

				if (existedUser) return done(null, existedUser);

				const newUser = new User({
					firstName: profile.name?.givenName,
					lastName: profile.name?.familyName,
					email: profile.emails?.[0].value,
					avatar: profile.photos?.[0].value,
					coverImage: profile.photos?.[0].value,
					isEmailVerified: true,
				});

				await newUser.save();

				return done(null, newUser);
			} catch (error) {
				return done(error as Error, false);
			}
		}
	)
);
