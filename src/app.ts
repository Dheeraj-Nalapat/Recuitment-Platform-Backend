import express, { NextFunction, Request, Response } from "express";
import dataSource from "./db/data-source.db";
import cors from "cors";

const server = express();
server.use(cors());

server.get("/", (request: Request, response: Response) => {
  response.status(201).send("home");
});

(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("failed to initialize dataSource: ", e);
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("server is running on port 3000");
  });
})();
