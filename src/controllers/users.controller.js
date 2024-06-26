import { userService } from "../services/users.service.js";

class UserController {
	async read(req, res) {
		try {
			const users = await userService.read();
			return res.status(200).json({
				statusCode: 200,
				payload: users,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				statusCode: 500,
				msg: "Error al obtener la lista de usuarios",
				error: error.message,
			});
		}
	}

	async create(req, res) {
		try {
			const userData = req.body;
			const file = req.files.image;

			const dataToSend = {
				userData: userData,
				file: file,
			};

			const newUser = await userService.create(dataToSend);
			return res.status(201).json({
				statusCode: 201,
				payload: newUser,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				statusCode: 500,
				error: error.message,
			});
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params;
			if (req.files) {
				const userData = req.body;
				const file = req.files.image;

				delete userData._id;
				delete userData.image;

				const user = {
					name: userData.name,
					race: userData.race,
					image: file,
					weight: userData.weight,
					birthday: userData.birthday,
					owner: userData.owner,
					whatsappNumber: userData.whatsappNumber,
				};

				const updatedUser = await userService.update(id, user);
				return res.status(200).json({
					statusCode: 200,
					payload: updatedUser,
				});
			} else {
				const userData = req.body;
				delete userData._id;

				const user = {
					name: userData.name,
					race: userData.race,
					image: userData.image,
					weight: userData.weight,
					birthday: userData.birthday,
					owner: userData.owner,
					whatsappNumber: userData.whatsappNumber,
				};

				const updatedUser = await userService.update(id, user);
				return res.status(200).json({
					statusCode: 200,
					payload: updatedUser,
				});
			}
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				statusCode: 500,
				error: error.message,
			});
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params;
			await userService.delete(id);
			return res.status(200).json({
				statusCode: 200,
				msg: "Usuario eliminado exitosamente",
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				statusCode: 500,
				error: error.message,
			});
		}
	}
}

export const usersController = new UserController();
