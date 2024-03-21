import express from "express";
import cors from "cors";
import compression from "compression";
import env from "./config/enviroment.config.js";
import { connectMongo } from "./db/index.js";
import { usersRouter } from "./routes/users.router.js";

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
