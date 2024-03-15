import { config } from "dotenv";
import { connectDB } from "./db";
import { app } from "./app";
import { env } from "./conf/env";

config();

connectDB()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  })
  .catch((err) => console.log(err));
