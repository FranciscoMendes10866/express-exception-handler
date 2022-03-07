import express from "express";

import { errorHandler } from "./exceptions/handler/errorHandler";
import { setupExceptions, exceptions } from "./exceptions";

const setupServer = (): void => {
  const app = express();
  setupExceptions();

  app.use(express.json());

  app.get("/", (req, res) => {
    throw exceptions.Forbidden();
  });

  app.use(errorHandler);
  app.listen(3000);
};

setupServer();
