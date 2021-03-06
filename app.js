const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: [true, "The rating is missing."],
		min: 1,
		max: 10,
	},
	review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
	name: "Apple",
	rating: 7,
	review: "Pretty solid as a fruit.",
});

apple.save();

const personSchema = new mongoose.Schema({
	name: String,
	age: Number,
	favouriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
	name: "John",
	age: 37,
	favouriteFruit: apple,
});

Person.updateOne({ name: "John" }, { favouriteFruit: apple }, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Successfully updated document.");
	}
});
// person.save();

const kiwi = new Fruit({
	name: "Kiwi",
	rating: 10,
	review: "The best fruit!",
});

const banana = new Fruit({
	name: "Banana",
	rating: 3,
	review: "Weird texture",
});

const orange = new Fruit({
	name: "Orange",
	rating: 4,
	review: "Too sour for me",
});

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log("Successfully saved all the fruits to fruitsDB.")
//     }
// })

// Fruit.find(function (err, fruits) {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		mongoose.connection.close();
// 		fruits.forEach((fruit) => console.log(fruit.name));
// 	}
// });

// Fruit.updateOne({ _id: "6097d104cb5fee374fcc8da6" }, { name: "Avocado" }, function (err) {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		console.log("Succesfully updated the document.");
// 	}
// });

// Fruit.deleteOne({ _id: "6097d104cb5fee374fcc8da8" }, function (err) {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		console.log("Successfully deleted docuemnt.");
// 	}
// });

// Person.deleteMany({ name: "John", age: { $gte: 40 } }, function (err) {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		console.log("Successfully deleted the documents.");
// 	}
// });
