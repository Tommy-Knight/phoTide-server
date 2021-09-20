import dotenv from "dotenv";
import jest from "jest";
import mongoose from "mongoose";
import server from "../server";
import supertest from "supertest";

require("dotenv").config();

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

describe("Testing rooms service", () => {
	describe("Stage I - Testing the test env", () => {
		it("should test that true is true", () => {
			expect(true).toBe(true);
		});
	});
	// beforeAll((done) => {
	// 	console.log(server)
	// 		mongoose
	// 			.connect(
	// 				process.env.MONGO_CONNECTION as string,
	// 				{ useNewUrlParser: true , useUnifiedTopology: true }
	// 			)
	// 			.then(() => {
	// 				console.log("Connected to Atlas");
	// 				server.listen(3069, () => {
	// 					console.log(`🕶`);
	// 				});
	// 			});
	// 	});
	// 	afterAll((done) => {
	// 		// Drop dummy db
	// 	mongoose.connection.dropDatabase(() => {
	// 		mongoose.connection.close(() => {
	// 			done();
	// 			});
	// 		});
	// 	});
});


// beforeAll((done) => {
// mongoose.connect(process.env.MONGO_CONNECTION!, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useFindAndModify: false,
// 	})
// 	.then(() => {
// 		server.listen(3069, () => {
// 			console.log("Running on port", 3069, "🎇");
// 			console.timeEnd("Server startup");
// 		});
// 	});
// });
// afterAll((done) => {
// 	mongoose.connection.dropDatabase(() => {
// 		mongoose.connection.close(() => {
// 			console.log("Closed connection to Atlas!");
// 			done();
// 		});
// 	});
// });


// describe("Endpoint Testing", () => {
// 	it("should return the full list of accomodations", async () => {
// 		const response = await request.get("/accomodation");
// 		expect(response.status).toBe(200);
// 		// expect(response.body.accomodations).length.not.toBe(0);
// 		// it("returns appropriate error when no accomodations are in array")
// 	});
// 	const validAccomo = {
// 		name: "casaTommy",
// 		description: "lovely place",
// 		maxGuests: 6,
// 		city: "60e83fb81b84ab2868bcad2e",
// 	};
// 	const invalidAccomo = {
// 		name: "casaTommy",
// 		description: "lovely place",
// 		maxGuests: 7
// 	};
// 	const newAccomo = {
// 		name: "tommyhouse",
// 		description: "cool place",
// 		maxGuests: 6,
// 		city: "60e83fb81b84ab2868bcad2e",
// 	};

// 	it("will add new accomodation and return 201 if valid", async () => {
// 		const response = await request.post("/accomodation").send(validAccomo);
// 		expect(response.status).toBe(201);
// 		expect(response.body._id).toBeDefined();

// 		const _response = await request.get("/accomodation/" + response.body._id);
// 		expect(_response.body.name).toEqual(validAccomo.name);
// 		expect(_response.status).toBe(200);
// 	});

// 	it("will return 400 if posting invalid accomodation data", async () => {

// 		const response = await request.post("/accomodation").send(invalidAccomo);
// 		expect(response.status).toBe(400);
// 	});

// 	it("will return 404 if the accomodation id is non existing", async () => {
// 		const response = await request.get("/accomodation/" + "60e8246813ea1236942b250e");
// 		expect(response.status).toBe(404);
// 	});

// 	it("will edit an existing accomodation and return 200", async () => {
// 		const response = await request.post("/accomodation").send(validAccomo);
// 		expect(response.status).toBe(201);
// 		const _response = await request.put("/accomodation/" + response.body._id).send(newAccomo);
// 		expect(_response.status).toBe(200);
// 	});

// 	it("editing with false id will return 404 if not existing", async () => {
// 		const response = await request.post("/accomodation").send(validAccomo);
// 		expect(response.status).toBe(201);
// 		const _response = await request.put("/accomodation/" + "60e8246813ea1236942b250e").send(newAccomo);
// 		expect(_response.status).toBe(404);
// 	});

// 	it("will delete accomodation and return 204 if ok", async () => {

// 		const response = await request.post("/accomodation").send(validAccomo);
// 		expect(response.status).toBe(201);
// 		const _response = await request.delete("/accomodation/" + response.body._id);
// 		expect(_response.status).toBe(204)
// 	})

// 	it("deleting will return 404 if not existing", async () => {
// 		const response = await request.post("/accomodation").send(validAccomo);
// 		expect(response.status).toBe(201);
// 		const _response = await request.delete("/accomodation/" + "60e8246813ea1236942b250e")
// 		expect(_response.status).toBe(404);
// 	})

// 	const city = {
// 		name: "Birmingham"
// 	}

// 	it("posting a new city will return 201", async () => {

// 		const response = await request.post("/destination").send(city)
// 		expect(response.status).toBe(201)

// 	})

// 	it("getting accomodations for city by id will return 200", async () => {

// 		const response = await request.post("/accomodation").send(validAccomo)

// 		const _response = await request.get("/destination/" + response.body.city)
// 		expect(_response.status).toBe(200)

// 	})

// 	it("getting accomodations for city by non existing id will return 404", async () => {

// 		const _response = await request.get("/destination/" + "60e83fa91b84ab2868bcad2c")
// 		expect(_response.status).toBe(404)

// 	})
// });
