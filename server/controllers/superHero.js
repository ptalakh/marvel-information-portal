import SuperHero from "../models/SuperHero.js";
import Comics from "../models/Comics.js";

export const getAllSuperHeroes = async(req, res) => {
    const {query: {limit = 9, offset = 0}} = req;
    try {

        const superHeroes = await SuperHero.find().limit(limit).skip(offset).populate('comics');;
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

        const superHero = await SuperHero.findById(id).populate('comics');
        if(!superHero){
            return res.json({message: 'there is no such superhero.'});
        }

        res.json(superHero);
    }
    catch (error){
        res.json({message: 'smth went wrong.'});
    }
}

export const getOneRandomSuperHero = async(req, res) => {
    try {

        // Count the total number of Super Heroes
        const count = await SuperHero.countDocuments();

        // Generate a random index within the range of available documents
        const randomIndex = Math.floor(Math.random() * count);

        // Find the Super Hero at the random index using 'findOne'
        const randomSuperHero = await SuperHero.findOne().skip(randomIndex).populate('comics');

        if (!randomSuperHero) {
            return res.json({ message: 'No Super Hero found.' });
        }

        res.json(randomSuperHero);
    }
    catch (error){
        res.json({message: 'smth went wrong.'});
    }
}

export const getOneSuperHeroByName = async(req, res) => {
    const {params: {name}} = req;

    const escapeRegex = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Экранируем все специальные символы
    }
    try {
        const regex = new RegExp(escapeRegex(name), 'i');

        const superHeroes = await SuperHero.find({ name: regex }).populate('comics');

        if (!superHeroes.length) {
            return res.json({ message: 'No one SuperHeroes found.' });
        }

        res.json(superHeroes);
    }
    catch (error){
        res.json({message: 'smth went wrong.'});
    }
}


