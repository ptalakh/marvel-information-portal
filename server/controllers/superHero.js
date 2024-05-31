import SuperHero from "../models/SuperHero.js";
import Comics from "../models/Comics.js";

export const getAllSuperHeroes = async(req, res) => {
    try {
        const superHeroes = await SuperHero.find();
        if(!superHeroes){
            return res.json({message: 'smth went wrong.'});
        }

        res.json(superHeroes);
    }
    catch (error){
        res.json({message: 'smth went wrong.'});
    }
}

export const getOneSuperHeroesById = async(req, res) => {
    try {
        const {params: {id}} = req;

        const superHero = await SuperHero.findById(id);
        if(!superHero){
            return res.json({message: 'there is no such superhero.'});
        }

        res.json(superHero);
    }
    catch (error){
        res.json({message: 'smth went wrong.'});
    }
}

