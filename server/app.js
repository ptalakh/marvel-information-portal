import  express  from "express";
import cors from 'cors';
import superHeroRouter from "./routes/superHero.js";
import comicsRouter from "./routes/comics.js";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload())
app.use(express.static('upload'))

app.use('/api', superHeroRouter)
app.use('/api', comicsRouter)

export default app;