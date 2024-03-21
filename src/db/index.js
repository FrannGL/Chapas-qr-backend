import { connect } from "mongoose";
import env from "../config/enviroment.config.js";

export async function connectMongo() {
  try {
    await connect(env.mongoUrl);
    console.log("¡Conexión exitosa a la base de datos!");
  } catch (e) {
    console.log("Falló la conexión a la base de datos.");
    throw e;
  }
}
