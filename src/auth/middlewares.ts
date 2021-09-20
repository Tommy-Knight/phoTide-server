import { NextFunction, Response } from "express";
import User from "../services/users/schema";
import createError from "http-errors";
import { verifyJWT } from "./tools";

export const JWTMiddleware = async (req: any, res: Response, next: NextFunction) => {
	if (!req.headers.authorization) {
		next(createError(401, "Provide authorization header!"));
	} else {
		try {
			const token = req.headers.authorization.replace("Bearer ", "");

			const decodedToken: any = await verifyJWT(token)!;

			const user = await User.findById(decodedToken._id);

			if (user) {
				req.user = user;
				next();
			} else {
				next(createError(404, "user not found!"));
			}
		} catch (error) {
			next(createError(401, "Token expired!"));
		}
	}
};
