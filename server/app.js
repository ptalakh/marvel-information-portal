import  express  from "express";
import cors from 'cors';
import superHeroRouter from "./routes/superHero.js";
import comicsRouter from "./routes/comics.js";
import fileUpload from "express-fileupload";
import * as path from "node:path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Получение __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
    origin: 'http://localhost:3000' // Replace with your frontend app's URL
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(fileUpload())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api', superHeroRouter)
app.use('/api', comicsRouter)

export default app;