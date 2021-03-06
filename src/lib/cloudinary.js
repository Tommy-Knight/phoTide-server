import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const cloudinaryStorage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "PhoTide/Avatar",
	},
});

export const uploadOnCloudinary = multer({
	storage: cloudinaryStorage,
}).single("avatar");
