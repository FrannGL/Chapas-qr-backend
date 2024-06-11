import express from "express";
import cors from "cors";
import compression from "compression";
import fileUpload from "express-fileupload";
import env from "../src/config/enviroment.config.js";
import { connectMongo } from "../src/db/index.js";
import { usersRouter } from "../src/routes/users.router.js";

const app = express();
const PORT = env.port;

// CONEXION A DB
connectMongo();

app.use(cors());
app.use(compression({ brotli: { enabled: true, zlib: {} } }));

// DIRNAME CONFIG
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// MIDDLEWARES BASICOS
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "uploads/",
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});

export default app;
