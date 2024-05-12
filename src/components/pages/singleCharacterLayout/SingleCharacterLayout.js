import './singleCharacterLayout.scss';
import { Helmet } from 'react-helmet';

const SingleCharacterLayout = ({data}) => {

    const {name, description, thumbnail} = data;

    return (
        <div className="single-character">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} character`}
                    />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-character__img" />
            <div className="single-character__info">
                <h2 className="single-character__name">{name}</h2>
                <p className="single-character__description">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterLayout;