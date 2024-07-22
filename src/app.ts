import express, { Request, Response } from "express";
import dataSource from "./db/data-source.db";
import cors from "cors";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import employeeRouter from "./routes/employee.routes";
import positionRouter from "./routes/position.routes";
import jobOpeningRouter from "./routes/jobOpening.routes";


const server = express();

server.use(bodyParser.json());
server.use(loggerMiddleware);
server.use(cors());
server.use("/employee", employeeRouter);
server.use("/position", positionRouter);
server.use("/jobs",jobOpeningRouter)

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

