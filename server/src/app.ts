import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./conf/env";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import { initialzeLocalStrategy } from "./strategy/localStrategy";

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

app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `${env.mongoUri}/sample_mflix`,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: env.sessionCookieExpiry,
      httpOnly: true,
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
initialzeLocalStrategy();

// routes imports

import { userRouter } from "./routes/user.route";

// routes declaration

app.get("/", (req, res) => {
  res.json({ message: "Hello from gopaladhikari!" });
});

app.use("/api/v1/users", userRouter);

export { app };
