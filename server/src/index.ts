import "dotenv/config";
import { app } from "./app";
import { env } from "./conf/env";
import { connectDB } from "./db";

connectDB()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  })
  .catch((err) => console.log(err));
