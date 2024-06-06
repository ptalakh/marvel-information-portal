import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase2 = 'http://localhost:5000/api'

    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'apikey=3be09fc8af1537efd3c14975105db7d1';
    const _baseOffset = 301;

    const getAllCharacters = async (offset) => {
        //const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
        const res = await request(`${_apiBase2}/superhero/all?limit=9&offset=${offset}`);
        return res.map(_transformCharacter);
        //return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase2}/superhero/${id}`);
        return _transformCharacter(res);
    }

    const getCharacterRandom = async () => {
        const res = await request(`${_apiBase2}/superhero/random/one`);
        return _transformCharacter(res);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase2}/superhero/${name}/one`);
        return res.map(_transformCharacter);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase2}/comics/all?limit=8&offset=${offset}`);
        return res.map(_transformComic);
    }

    const getComic = async (id) => {
		const res = await request(`${_apiBase2}/comics/${id}`);
		return _transformComic(res);
	};

    const _transformComic = (comics) => {
        return {
            id: comics._id,
            title: comics.title,
            price: comics.price
				? `${comics.price}$`
				: "not available",
                description: comics.description || "There is no description",
                pageCount: comics.pages
                    ? `${comics.pages} p.`
                    : "No information about the number of pages",
                thumbnail: comics.imgUrl,
                language: comics.language || "en-us",
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char._id,
            name: char.name,
            description: char.description || 'There is no description for this character',
            thumbnail: char.imgUrl,
            // homepage: char.urls[0].url,
            wiki: char.wiki,
            comics: char.comics,
            abilities: char.abilities,
        }
    }

    return {clearError,
            process,
            setProcess,
            getAllCharacters,
            getCharacter,
            getCharacterByName,
            getAllComics,
            getComic,
        getCharacterRandom};
}

export default useMarvelService;