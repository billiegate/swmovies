const axios = require('axios');
const filmService = require("../service/film.service");



const fetchAll = (req, res) => {
    try {
        const films = filmService.fetchFilms();
        return res.status(200).json(films)
    } catch ( e ) {
        return res.status(400).send( e.toString() )
    }
}



const fetchCharacter = async (req, res) => {

    const sortBy = req.query.sortBy ? req.query.sortBy : null
    const order = req.query.order ? req.query.order : null
    const filter = req.query.filter ? req.query.filter : null
    const id = req.params.id ? req.params.id : 1
    const data = {
        sortBy,
        order,
        filter,
        id
    }

    try {
        const characters = await filmService.fetchCharacter( data );
        return res.status(200).json(characters)
    } catch ( e ) {
        return res.status(400).send( e.toString() )
    }

}

module.exports = {
    fetchAll,
    fetchCharacter
}