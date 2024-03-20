import { usersModel } from "../DAO/mongo/users.model.js";

class UserService {
	async read() {
		try {
			const users = await usersModel.read();
			return users;
		} catch (e) {
			console.log(e);
		}
	}

	async create(userData) {
		try {
			console.log(userData);
			const newUser = await usersModel.create(userData);
			return newUser;
		} catch (error) {
			throw new Error("Error al crear un nuevo usuario en la base de datos");
		}
	}

	async update(id, userData) {
		try {
			const updatedUser = await usersModel.update(id, userData);
			return updatedUser;
		} catch (error) {
			throw new Error("Error al actualizar el usuario en la base de datos");
		}
	}

	async delete(userId) {
		try {
			await usersModel.delete(userId);
		} catch (error) {
			console.error(error);
			throw new Error("Error al eliminar el usuario de la base de datos");
		}
	}
}
export const userService = new UserService();
