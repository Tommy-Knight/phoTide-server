import dotenv from "dotenv";
import jest from "jest";
import mongoose from "mongoose";
import server from "../server";
import supertest from "supertest";

dotenv.config();

const request = supertest(server);

describe("Stage I - Testing the test env", () => {
	it("should test that true is true", () => {
		expect(true).toBe(true);
	});

	it("should test that false is not true", () => {
		expect(false).not.toBe(true);
	});

	it("should test that false is falsy", () => {
		expect(false).toBeFalsy();
	});
});

// describe("Testing rooms service", () => {
// 	describe("Stage II - Testing the test env test env", () => {
// 		it("should test that true is true", () => {
// 			expect(true).toBe(true);
// 		});
// 	});
// 	beforeAll((done) => {
// 		console.log(server);
// 		mongoose.connect(process.env.MONGO_CONNECTION!).then(() => {
// 			console.log("Connected to Atlas");
// 			server.listen(3069, () => {
// 				console.log(`🕶`);
// 			});
// 		});
// 	});
// 	afterAll((done) => {
// 		// Drop dummy db
// 		mongoose.connection.dropDatabase(() => {
// 			mongoose.connection.close(() => {
// 				done();
// 			});
// 		});
// 	});
// });
