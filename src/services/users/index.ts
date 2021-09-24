import { JWTAuthenticate, refreshTokenFunc } from "../../auth/tools";
import { NextFunction, Request, Response } from "express";
import { JWTAuthMiddleware } from "../../auth/middlewares";
import { UserType } from "../../types";
import User from "./schema";
import createError from "http-errors";
import express from "express";
import getUser from "./schema";
import { uploadOnCloudinary } from "../../lib/cloudinary.js";
import UserModel from "../../services/users/schema";

const usersRouter = express.Router();

//><><><><> GET ALL USERS <><><><><\\

usersRouter.get("/", JWTAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await getUser.find({});
		res.send(users);
	} catch (error) {
		next(createError(500, "An error occurred while getting users"));
	}
});

// ><><><><> GET LOGGED IN USER INFO <><><><><\\

usersRouter.get(
	"/me",
	JWTAuthMiddleware,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.send(req.user);
		} catch (error) {
			console.log(error);
			next(createError(500, "An error occurred while finding you"));
		}
	}
);

// ><><><><> GET SPECIFIC USER BY ID <><><><><\\

usersRouter.get(
	"/:id",
	JWTAuthMiddleware,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const author = await getUser.find({ user: req.params.id });
			author ? res.send(author) : next(createError(404, `User ${req.params.id} not found`));
		} catch (error) {
			next(error);
		}
	}
);

// ><><><><> UPDATE USER INFO BY ID <><><><><\\

usersRouter.put("/:id", JWTAuthMiddleware, async (req: any, res: Response, next: NextFunction) => {
	try {
		const userId = req.params.id.toString();
		const myId = req.user._id;

		if (userId === myId) {
			const updatedUser = await User.findOneAndUpdate({ _id: myId }, req.body, {
				new: true,
				runValidators: true,
			});
			if (updatedUser) {
				res.send(updatedUser);
			} else {
				next(createError(404, `User Not Found!`));
			}
		} else {
			next(createError(404, `You are not authorized!`));
		}
	} catch (error) {
		next(error);
	}
});

// ><><><><> DELETE USER BY ID <><><><><\\

usersRouter.delete(
	"/:id",
	JWTAuthMiddleware,
	async (req: any, res: Response, next: NextFunction) => {
		try {
			const userId = req.params.id.toString();
			const myId = req.user._id.toString();

			if (userId === myId) {
				const deletedUser = await User.findOneAndDelete({ _id: myId });
				if (deletedUser) {
					res.status(204).send();
				} else {
					next(createError(404, `User Not Found!`));
				}
			} else {
				next(createError(404, `You are not authorized!`));
			}
		} catch (error) {
			next(error);
		}
	}
);

usersRouter.post(
	"/me/cover",
	uploadOnCloudinary,
	JWTAuthMiddleware,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId: UserType = req.user;
			const newAvatar = { avatar: req.file.path };
			const updatedAvatar = await UserModel.findByIdAndUpdate(userId._id, newAvatar, {
				new: true,
			});
			if (!updatedAvatar) {
				return next(createError(404, "user not found"));
			} else {
				res.send(updatedAvatar);
			}
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
);

export default usersRouter;
