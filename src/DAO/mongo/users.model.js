import { UsersMongoose } from "./models/users.mongoose.js";

class UsersModel {
	async read() {
		try {
			const users = await UsersMongoose.find();
			return users;
		} catch (error) {
			throw new Error("Error al obtener los usuarios desde la base de datos");
		}
	}

	async create(userData) {
		try {
			const newUser = await UsersMongoose.create(userData);
			return newUser;
		} catch (error) {
			console.log(error);
			throw new Error("Error al crear un nuevo usuario en la base de datos");
		}
	}

	async update(id, userData) {
		try {
			const updatedUser = await UsersMongoose.findByIdAndUpdate(id, userData, { new: true });
			return updatedUser;
		} catch (error) {
			console.log(error);
			throw new Error("Error al actualizar el usuario en la base de datos");
		}
	}

	async delete(userId) {
		try {
			await UsersMongoose.findByIdAndDelete(userId);
		} catch (error) {
			console.error(error);
			throw new Error("Error al eliminar el usuario de la base de datos");
		}
	}
}

export const usersModel = new UsersModel();
