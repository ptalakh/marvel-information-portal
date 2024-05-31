import mongoose from "mongoose";

const SuperHeroSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
            default: ''
        },
        description:{
            type: String,
            required: true
        },
        abilities: {
          type: Array,
          required: true
        },
        comics: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comics'
        }],
        wiki: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    })

export default mongoose.model('SuperHero', SuperHeroSchema);