import { Router } from "express";
import {getAllSuperHeroes, getOneSuperHeroesById} from "../controllers/superHero.js";

const router = new Router()

router.get('/superhero/all', getAllSuperHeroes)

router.get('/superhero/:id', getOneSuperHeroesById)

export default router