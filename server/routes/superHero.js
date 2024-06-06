import { Router } from "express";
import {
    getAllSuperHeroes,
    getOneSuperHeroesById,
    getOneRandomSuperHero,
    getOneSuperHeroByName
} from "../controllers/superHero.js";

const router = new Router()

router.get('/superhero/all', getAllSuperHeroes)

router.get('/superhero/:id', getOneSuperHeroesById)

router.get('/superhero/random/one', getOneRandomSuperHero)

router.get('/superhero/:name/one', getOneSuperHeroByName)

export default router