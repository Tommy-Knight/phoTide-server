import {
	badRequestErrorHandler,
	catchAllErrorHandler,
	notFoundErrorHandler,
} from "./errorHandlers";
import cors from "cors";
import express from "express";
import listEndpoints from "express-list-endpoints";
import usersRouter from "./services/users/index";

// import passport from "passport";
// import facebookStrategy from "./auth/oauth";

// process.env.MONGO_CONNECTION && require("dotenv").config();

console.time("Server startup");
const server = express();

// passport.use("facebook", facebookStrategy);

// ><><><><: MIDDLEWARES :><><><>< \\

server.use(cors());
server.use(express.json());
// server.use(passport.initialize());

// ><><><><: ROUTES :><><><>< \\

server.use("/users", usersRouter);
console.table(listEndpoints(server));

// ><><><><: ERROR MIDDLEWARES :><><><>< \\

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(catchAllErrorHandler);

export default server;
