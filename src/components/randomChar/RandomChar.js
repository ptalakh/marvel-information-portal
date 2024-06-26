import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {CONSTANTS} from "../../constants";

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const {getCharacterRandom, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 15000);

        return () => {
            clearInterval(timerId);
        }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        clearError();

        //const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getCharacterRandom()
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    };

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner" onClick={updateChar}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}


const View = ({data}) => {
    console.log(data);
    const {name, description, thumbnail, homepage, wiki} = data;
    const thumbnailAvailable = thumbnail ? true : false;

    return (
        <div className="randomchar__block">
            <img src={`${CONSTANTS.API_IMAGE_URL}${thumbnail}`} alt="Random character" className="randomchar__img" style={thumbnailAvailable ? null : {'objectFit': 'contain'}}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description.slice(0, 210)}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;