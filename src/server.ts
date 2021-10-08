import {
	badRequestErrorHandler,
	catchAllErrorHandler,
	notFoundErrorHandler,
} from "./errorHandlers";
import cors from "cors";
import express from "express";
import listEndpoints from "express-list-endpoints";
import usersRouter from "./services/users/index";
import authRouter from "./services/auth.js"
import cookieParser from "cookie-parser";

// import passport from "passport";
// import facebookStrategy from "./auth/oauth";
// passport.use("facebook", facebookStrategy);
// server.use(passport.initialize());

const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL];

// ****************** MIDDLEWARES ****************************

const server = express();
console.time("Server startup");
server.use(express.json());

server.use(cookieParser());
server.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || whitelist.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error(" 💀 Not allowed by cors!"));
			}
		},
		credentials: true,
	})
);


// ><><><><: ROUTES :><><><>< \\

server.use("/auth", authRouter);
server.use("/users", usersRouter);
console.table(listEndpoints(server));

// ><><><><: ERROR MIDDLEWARES :><><><>< \\

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(catchAllErrorHandler);

export default server;
