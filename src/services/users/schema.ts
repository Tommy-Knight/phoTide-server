import mongoose, { Model } from "mongoose";
import { UserType } from "../../types/index";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

export interface UserDocument extends Document, UserType {}

export interface UserMod extends Model<UserDocument> {
	checkCredentials(email: string, password: string): Promise<UserDocument | null>;
}

const UsersSchema = new Schema<UserDocument>(
	{
		username: { type: String, required: true, default: "User" },
		email: { type: String, required: true },
		password: { type: String, required: true },
		favourites: { type: [] },
		avatar: { type: String, default: "https://image.flaticon.com/icons/png/512/5173/5173555.png" },
	},
	{ timestamps: true }
);

//<><><><>< HASH THE PASSWORDS <><><><><

UsersSchema.pre("save", async function (next) {
	const newUser = this;
	const plainPW = newUser.password!;
	if (newUser.isModified("password")) {
		newUser.password = await bcrypt.hash(plainPW, 10);
	}
	next();
});

//<><><><>< HIDES PASSWORD AND __V FROM JSON RETURN <><><><><

UsersSchema.methods.toJSON = function () {
	const userDocument = this;
	const userObject = userDocument.toObject();
	delete userObject.password;
	delete userObject.__v;
	return userObject;
};

//<><><><>< COMPARE PASSWORDS <><><><><

UsersSchema.statics.checkCredentials = async function (email, plainPW) {
	const user = await this.findOne({ email });
	if (user) {
		const isMatch = await bcrypt.compare(plainPW, user.password);
		return isMatch ? user : null;
	} else {
		return null;
	}
};

//<><><><>< MONGOOSE GETUSERS <><><><><

UsersSchema.static("getUser", async function (id) {
	const user = await this.findOne({ _id: id });
	return user;
});

export default model<UserDocument, UserMod>("User", UsersSchema);
