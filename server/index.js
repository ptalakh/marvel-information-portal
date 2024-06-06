import * as http from "node:http";
import app  from './app.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import SuperHero from "./models/SuperHero.js";
import Comics from "./models/Comics.js";
import {charactersData, comicsData} from "./data/index.js";


dotenv.config()

const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

const server = http.createServer(app);

async function start(){
    try{
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@marvalcluster.jrjxuzy.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`)

        async function main(){


        }

        await main()
        server.listen(PORT, ()=>{
            console.log(`Server started on port ${PORT}`)

        })

    }catch(err){
        console.log(err);
    }
}
start();