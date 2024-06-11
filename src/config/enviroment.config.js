import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();
program.option("--mode <mode>", "Modo de Trabajo", "DEVELOPMENT");
program.parse();

dotenv.config({
	path: program.opts().mode === "DEVELOPMENT" ? "./.env" : "./.env.production",
});

export default {
	port: process.env.PORT,
	mongoUrl: process.env.MONGO_URL,
	apiUrl: process.env.API_URL,
	AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
	AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
	AWS_PUBLIC_KEY: process.env.AWS_PUBLIC_KEY,
	AWS_SECRET_KEY_: process.env.AWS_SECRET_KEY_,
};
