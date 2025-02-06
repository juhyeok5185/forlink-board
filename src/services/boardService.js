const redisClient = require("../config/redisClient");

exports.createBoard = async (title, content) => {
    const newId = await redisClient.incr("board:ids");

    await redisClient.hSet(`board:${newId}`, "title", title, "content", content);
    await redisClient.rPush("board:list", String(newId));

    return { id: newId, title, content };
};

exports.getAllBoards = async () => {
    const ids = await redisClient.lRange("board:list", 0, -1);
    return await Promise.all(
        ids.map(async (id) => {
            const board = await redisClient.hGetAll(`board:${id}`);
            return { id, ...board };
        })
    );
};

exports.getBoardById = async (id) => {
    const board = await redisClient.hGetAll(`board:${id}`);
    return board.title ? { id, ...board } : null;
};

exports.deleteBoard = async (id) => {
    const board = await redisClient.hGetAll(`board:${id}`);
    if (!board.title) return false;

    await redisClient.del(`board:${id}`);
    await redisClient.lRem("board:list", 0, id);
    return true;
};
