const axios = require('axios'); // require axios for http calls
const commentDb = require("../db/comment"); //

// get film endpoint
const filmUrl = "https://swapi.dev/api/films/"

/**
 * @method fetchFilms 
 * returns all the films present
 * @throws exception
 */
const fetchFilms = () => {

    axios.get(filmUrl).then( result => {

        const m = result.data.results.map( m => ({
            "name": m.title,
            "opening_crawl": m.opening_crawl,
            "episode_id": m.episode_id,
            "release_date": m.release_date,
            "url": m.url
        }));

        m.sort( (a, b) => a.release_date - b.release_date);

        for (let i = 0; i < m.length; i++) {
            m[i]["comment-count"] = commentDb.fetchByEpisode(m[i]["episode_id"]).length || 0;
        }

        return m;

    }).catch( e => { 
        throw e;
    })

}


/**
 * @method fetchCharacter 
 * returns all the characters present in a film
 * @throws exception
 */
const fetchCharacter = async ({sortBy, order, filter, id}) => {

    const characters = [];

    const film = await axios.get(filmUrl + id )

    let count = 0; //film.data.characters.length;
    let totalHeight = 0;

    for (let i = 0; i < film.data.characters.length; i++) {
        const _chr = await axios.get(film.data.characters[i]);
        if ( filter ) {
            if (_chr.data.gender === filter) {
                characters.push(_chr.data)
                totalHeight+=parseInt(_chr.data.height)
                count+=1
            }
        } else {
            characters.push(_chr.data)
            totalHeight+=parseInt(_chr.data.height)
            count+=1
        }
        
    }

    if ( sortBy ) {
        characters.sort( (a, b) => {
            if ( order === "desc") {
                return b[sortBy] - a[sortBy] 
            }
            return a[sortBy] - b[sortBy] 
        })
    }

    const d = totalHeight / 30.48;
    const heightFeets = Math.floor(d);
    const _heightFeets = d % heightFeets;
    const heightInches = _heightFeets * 12;

    const result = {
        meta: {
            count,
            totalHeight,
            "height-in-feets": heightFeets + "ft " + heightInches.toFixed(2) + "inches"
        },
        characters
    }

    return result;
}

// export module
module.exports = {
    fetchFilms,
    fetchCharacter
}