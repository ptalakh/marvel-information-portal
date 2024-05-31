import Comics from "../models/Comics.js";
import SuperHero from "../models/SuperHero.js";
export const getAllComics = async(req, res) => {
    try {
        const comics = await Comics.find();
        if(!comics){
            return res.json({message: 'smth went wrong.'});
        }

        res.json(comics);
    }
    catch (error){
        res.json({message: 'smth went wrong.'});
    }
}

export const getOneComicsById = async(req, res) => {
    try {
        const {params: {id}} = req;

        const oneComics = await Comics.findById(id);
        if(!oneComics){
            return res.json({message: 'there is no such superhero.'});
        }

        res.json(oneComics);
    }
    catch (error){
        res.json({message: 'smth went wrong.'});
    }
}

import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const setDependencySuperHeroAndComics = async (req, res) => {
    const { body: { comicTitle, superheroNames } } = req;

    try {
        const comic = await Comics.findOne({ title: comicTitle });
        if (!comic) {
            throw new Error(`Comic with title "${comicTitle}" not found`);
        }

        console.log(comic);

        // Найти супергероев по именам
        const superheroes = await SuperHero.find({ name: { $in: superheroNames } });

        // Получение массива строковых ObjectId
        const superheroIds = superheroes.map(hero => String(hero._id));

        // Обновление комикса, добавление ссылок на супергероев
        comic.characters = comic.characters ? comic.characters.concat(superheroIds) : superheroIds;
        await comic.save();

        // Обновление супергероев, добавление ссылки на комикс
        await SuperHero.updateMany(
            { _id: { $in: superheroIds } },
            { $addToSet: { comics: comic._id } }
        );

         res.json({message: 'all good'})

    } catch (error) {
        console.log(error);
    }
}
