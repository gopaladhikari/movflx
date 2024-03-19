import { config } from "dotenv";
import { app } from "./app";
import { env } from "./conf/env";
import { connectDB } from "./db";

config();

connectDB()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  })
  .catch((err) => console.log(err));
