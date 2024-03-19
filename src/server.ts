import express, { Request, Response } from "express";
import cors from "cors";
import compression from "compression";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(compression({ brotli: { enabled: true, zlib: {} } }));

app.get('/api', (req: Request, res: Response) => {
	res.json({ message: '¡Hola mundo desde Express y TypeScript!'});
  });
  

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
