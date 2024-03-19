import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./conf/env";

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

// routes imports

import { userRouter } from "./routes/user.route";

// routes declaration

app.use("/api/v1/users", userRouter);

export { app };
