import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'apikey=3be09fc8af1537efd3c14975105db7d1';
    const _baseOffset = 301;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}/characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/comics?issueNumber=1&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const getComic = async (id) => {
		const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
		return _transformComic(res.data.results[0]);
	};

    const _transformComic = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
                description: comics.description || "There is no description",
                pageCount: comics.pageCount
                    ? `${comics.pageCount} p.`
                    : "No information about the number of pages",
                thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
                language: comics.textObjects[0]?.language || "en-us",
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description || 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {clearError,
            process,
            setProcess,
            getAllCharacters,
            getCharacter,
            getCharacterByName,
            getAllComics,
            getComic};
}

export default useMarvelService;