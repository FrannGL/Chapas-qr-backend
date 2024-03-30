import { Schema, model } from "mongoose";

const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	race: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: false,
	},
	weight: {
		type: Number,
		required: true,
	},
	birthday: {
		type: Date,
		required: true,
	},
	owner: {
		type: String,
		required: true,
	},
	whatsappNumber: {
		type: String,
		required: true,
	},
});

export const UsersMongoose = model("users", schema);
