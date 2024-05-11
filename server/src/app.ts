import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./conf/env";
import passport from "passport";
import { ApiResponse } from "./utils/ApiResponse";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
	cors({
		origin: env.corsOrigin,
		credentials: true,
	})
);

// passport middleware
app.use(passport.initialize());
import "./strategy/jwtStrategy";
import "./strategy/localStrategy";
// import "./strategy/googleStrategy";

// routes imports

import { userRouter } from "./routes/user.routes";
import { movieRouter } from "./routes/movie.routes";
import { commentRouter } from "./routes/comment.routes";
import { contactRouter } from "./routes/contact.routes";
import { theaterRouter } from "./routes/theater.routes";
import { pricingRouter } from "./routes/pricing.routes";
import { paymentRouter } from "./routes/payment.routes";

// routes declaration

app.get("/", (req, res) => {
	res.json(new ApiResponse(200, "Server is up and running", "Welcome"));
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/theaters", theaterRouter);
app.use("/api/v1/pricing", pricingRouter);
app.use("/api/v1/payment", paymentRouter);

export { app };

// TODO: Add update user details
// TODO: Subscription feature payment gateway paypal, esewa, khalti
// TODO: watch list watch history
// TODO: Add playlist, watch later and liked movies
// TODO: User can have on subscription at a time. If registered for new subscription, previous subscription will be cancelled.
/**
 *  * When the user pays for the subscription, user should be allowed to watch movies. Movies will be received from tmdb.
 */
