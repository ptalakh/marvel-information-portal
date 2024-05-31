import mongoose from "mongoose";

const ComicsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        pages: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        imgUrl: {
            type: String,
            default: ''
        },
        characters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SuperHero'
        }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Comics', ComicsSchema)