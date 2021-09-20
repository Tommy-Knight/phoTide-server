import mongoose from "mongoose";
import server from "./server";

process.env.TS_NODE_DEV && require("dotenv").config();
const port = process.env.PORT || 3069;

// ><><><><: MONGO TIME :><><><>< \\

mongoose.connect(process.env.MONGO_CONNECTION!, {}).then(() => {
	server.listen(port, () => {
		console.log("Running on port", port, "🎇");
		console.timeEnd("Server startup");
	});
});
