import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./conf/env";
import passport from "passport";

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

// routes declaration

app.get("/", (req, res) => {
	res.json({ message: "Hello from gopaladhikari!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/contacts", contactRouter);

export { app };
