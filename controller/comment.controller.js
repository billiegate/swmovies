var moment = require('moment');
const commentDb = require("../db/comment");

const fetchAll = async (req, res) => {
    const comments = await commentDb.fetch();
    res.status(200).json({ comments })
}

const createComment = async (req, res) => {
    const comment = req.body;
    if (comment.content.length > 500) {
        return res.status(400).send("comment length should not be greater than 500 characters")
    }
    comment.created_at = moment().format();
    comment.public_ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress;
    const comments = await commentDb.create( comment );
    return res.status(200).json({ comments })
}

module.exports = {
    fetchAll,
    createComment
}