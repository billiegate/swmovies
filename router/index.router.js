const commentController = require("../controller/comment.controller")
const filmController = require("../controller/film.controller")

const router = router => {

    router.get("/comment", commentController.fetchAll)

    router.post("/comment", commentController.createComment)

    router.get("/", filmController.fetchAll);

    router.get("/character/:id", filmController.fetchCharacter);

    return router;
}

module.exports = router;