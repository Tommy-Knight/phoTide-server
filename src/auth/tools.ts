import User from "../services/users/schema"
import createError from "http-errors";
import jwt from "jsonwebtoken";

let refreshToken = process.env.JWT_REFRESH!;
let secretToken = process.env.JWT_SECRET!;

const generateJWT = (payload: any) =>
	new Promise((resolve, reject) =>
		jwt.sign(payload, secretToken, { expiresIn: "2 days" }, (err, token) => {
			if (err) reject(err);
			resolve(token);
		})
	);

const generateRefreshJWT = (payload: any) =>
	new Promise((resolve, reject) =>
		jwt.sign(payload, refreshToken, { expiresIn: "1 week" }, (err, token) => {
			if (err) reject(err);
			resolve(token);
		})
	);

export const JWTAuthenticate = async (user: any) => {
	// console.log("🍕", user)
	const accessToken = await generateJWT({ _id: user._id });
	const refreshToken = await generateRefreshJWT({ _id: user._id });
	user.refreshToken = refreshToken;
	await user.save();
	return { accessToken, refreshToken };
};
export const verifyJWT = (token: any) =>
	new Promise((resolve, reject) =>
		jwt.verify(token, secretToken, (err: any, decodedToken: any) => {
			if (err) reject(err);
			resolve(decodedToken);
		})
	);

export const verifyRefreshJWT = (token: any) =>
	new Promise((resolve, reject) =>
		jwt.verify(token, refreshToken, (err: any, decodedToken: any) => {
			if (err) reject(err);
			resolve(decodedToken);
		})
	);

export const refreshTokens = async (actualRefreshToken: any) => {
	try {
		const decoded: any = await verifyRefreshJWT(actualRefreshToken)!;
		const user = await User.findById(decoded._id);

		if (!user) throw new Error("User not found!");
		if (actualRefreshToken === user.refreshToken) {
			const { accessToken, refreshToken } = await JWTAuthenticate(user);
			return { accessToken, refreshToken };
		} else {
			console.log("do nothing");
		}
	} catch (error) {
		createError(401, "Token not valid!");
	}
};
