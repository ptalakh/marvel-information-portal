import { Router } from "express";
import {getAllComics, getOneComicsById, setDependencySuperHeroAndComics} from "../controllers/comics.js";

const comicsRouter = new Router()

comicsRouter.get('/comics/all', getAllComics)

comicsRouter.get('/comics/:id', getOneComicsById)

comicsRouter.post('/comics/setDependency', setDependencySuperHeroAndComics)

export default comicsRouter