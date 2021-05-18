const db = require("./knex");

const create = Comment => {
    return db("comments").insert(Comment);
}

const fetch = () => {
    return db("comments").select("*");
}

const fetchOne = (id) => {
    return db("comments").where("id", id);
}

const fetchByEpisode = (id) => {
    return db("comments").where("episode_id", id);
}

const remove = (id) => {
    return db("comments").where("id", id).del();
}

const update = (id, Comment) => {
    return db("comments").where("id", id).update(Comment);
}

module.exports = {
    create,
    fetch,
    fetchOne,
    fetchByEpisode,
    remove,
    update
}