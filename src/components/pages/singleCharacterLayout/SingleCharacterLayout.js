import './singleCharacterLayout.scss';
import { Helmet } from 'react-helmet';
import {CONSTANTS} from "../../../constants";
import {Link} from "react-router-dom";

const SingleCharacterLayout = ({data}) => {

    const {name, description, thumbnail, abilities, comics} = data;
    console.log(abilities)

    return (
        <div className="single-character">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} character`}
                    />
                <title>{name}</title>
            </Helmet>
            <img src={`${CONSTANTS.API_IMAGE_URL}${thumbnail}`} alt={name} className="single-character__img" />
            <div className="single-character__info">
                <h2 className="single-character__name">{name}</h2>
                <p className="single-character__description">{description}</p>
                <ul>
                    {abilities?.map((ability, index) => (
                        <li key={index}>{ability}</li>
                    ))}
                </ul>
            </div>
            {comics ? (
                <div>
                    <ul>
                        {comics.map((comic) => (
                            <Link key={comic._id} to={`/comics/${comic._id}`}>{comic.title}</Link>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}

export default SingleCharacterLayout;