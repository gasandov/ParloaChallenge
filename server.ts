import express, { Express } from "express";
import { config } from "dotenv";

import { router as CustomerRoute } from "./src/routes/customers.route";

config();

export const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use("/customers", CustomerRoute);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
  });
}