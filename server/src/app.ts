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

// routes imports

import { userRouter } from "./routes/user.route";
import { movieRouter } from "./routes/movie.route";

// routes declaration

app.get("/", (req, res) => {
  res.json({ message: "Hello from gopaladhikari!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", movieRouter);

export { app };
