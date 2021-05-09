const assert = require("assert");
const MongoClient = require("mongodb").MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertData() {
	try {
		await client.connect();
		console.log("Connected successfully to database server.");
		const database = client.db("fruitsDB");
		const fruitsCollection = database.collection("fruits");

		const newData = [
			{ name: "Apple", score: 8, review: "Great fruit" },
			{ name: "Orange", score: 6, review: "Kinda sour" },
			{ name: "Banana", score: 9, review: "Great stuff!" },
		];
		const result = await fruitsCollection.insertMany(newData);
		assert(3 === result.result.n);
		assert(3 === result.ops.length);
		console.log("Inserted 3 items into the collection");
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
// insertData().catch(console.dir);

async function readData() {
	try {
		client.connect();
		console.log("Connected successfully to database server.");
		const database = client.db("fruitsDB");
		const fruitsCollection = database.collection("fruits");

        const fruits = await fruitsCollection.find({}).toArray();
        console.log(fruits)
	} finally {
        await client.close();
	}
}
readData().catch(console.dir)
