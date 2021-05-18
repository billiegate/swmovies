const knex = require("knex");

const connect = knex({
    client: "sqlite3",
    connection: {
        filename: "mov.sqlite3"
    }
})

module.exports = connect;