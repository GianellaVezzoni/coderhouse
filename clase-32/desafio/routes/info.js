import express from "express";
import util from "util";
import { fork } from "child_process";
import compression from "compression";

const infoRoutes = express.Router();

infoRoutes.get("/info", compression(),  async (req, res) => {
  const memory = util.inspect(process.memoryUsage().rss);
  res.render("info", {
    arguments: process?.argv?.slice(2).length
      ? process?.argv?.slice(2)
      : "no se pasaron args",
    platformName: process.platform,
    nodeVersion: process.version,
    totalMemory: memory,
    execPath: process.execPath,
    pid: process.pid,
    projectFile: process.cwd(),
  });
});

infoRoutes.get("/randoms", (req, res) => {
  const cant = parseFloat(Object.keys(req.query)[0]);
  const forkResult = fork("./utils/calculateRandomNumbers.js");
  forkResult.on("message", (msg) => {
    if (msg == "ready") {
      forkResult.send(cant);
    } else {
      res.json(msg);
    }
  });
});

export default infoRoutes;
