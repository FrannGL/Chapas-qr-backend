import { usersModel } from "../DAO/mongo/users.model.js";
import moment from "moment";
import { __dirname } from "../server.js";
import { uploadFile, getFileURL } from "../config/s3.js";

class UserService {
	async read() {
		try {
			const users = await usersModel.read();
			return users;
		} catch (e) {
			console.log(e);
		}
	}

	async create(data) {
		try {
			const { userData, file } = data;

			await uploadFile(file);
			const fileName = file.name;
			const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${fileName}`;

			userData.birthday = moment(userData.birthday, "DD/MM/YYYY").toDate();

			const newUser = {
				name: userData.name,
				race: userData.race,
				image: url,
				weight: userData.weight,
				birthday: userData.birthday,
				owner: userData.owner,
				whatsappNumber: userData.whatsappNumber,
			};

			const createdUser = await usersModel.create(newUser);
			return createdUser;
		} catch (error) {
			console.log(error);
			throw new Error("Error al crear un nuevo usuario en la base de datos");
		}
	}

	async update(id, userData) {
		try {
			if (userData.image.data) {
				await uploadFile(userData.image);
				const fileName = userData.image.name;

				const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${fileName}`;

				userData.birthday = moment(userData.birthday, "DD/MM/YYYY").toDate();

				const newUser = {
					name: userData.name,
					race: userData.race,
					image: url,
					weight: userData.weight,
					birthday: userData.birthday,
					owner: userData.owner,
					whatsappNumber: userData.whatsappNumber,
				};
				const updatedUser = await usersModel.update(id, newUser);
				return updatedUser;
			} else {
				const updatedUser = await usersModel.update(id, userData);
				return updatedUser;
			}
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
