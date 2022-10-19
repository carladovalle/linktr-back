import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./src/routes/routes.js";

const server = express();
dotenv.config();

server.use(cors());
server.use(express.json());
server.use(route);

server.listen(process.env.PORT, () => console.log(`Magic happens at ${process.env.PORT}`));