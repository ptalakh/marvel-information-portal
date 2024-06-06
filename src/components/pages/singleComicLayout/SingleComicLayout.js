import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import './singleComicLayout.scss';
import {CONSTANTS} from "../../../constants";

const SingleComicLayout = ({data}) => {
    const {title, description, pageCount, thumbnail, language, price} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comic book`}
                    />
                <title>{title}</title>
            </Helmet>
            <img src={`${CONSTANTS.API_IMAGE_URL}${thumbnail}`} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <p className="single-comic__price">{price}</p>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicLayout;