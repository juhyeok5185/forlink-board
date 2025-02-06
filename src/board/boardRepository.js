const redisClient = require("../config/redisConfig");

const BOARD_IDS_KEY = "board:ids";  // 게시글 ID 자동 증가 키
const BOARD_LIST_KEY = "board:list"; // 게시글 ID 목록 키

/**
 * 새로운 게시글 저장 (ID 자동 증가)
 */
exports.save = async (title, content) => {
    const newId = await redisClient.incr(BOARD_IDS_KEY);
    await redisClient.hSet(`board:${newId}`, "title", title, "content", content);
    await redisClient.rPush(BOARD_LIST_KEY, String(newId));
    return { id: newId, title, content };
};

/**
 * 전체 게시글 조회 (페이징 기능 추가 가능)
 */
exports.findAll = async (start = 0, end = -1) => {
    const ids = await redisClient.lRange(BOARD_LIST_KEY, start, end);
    const boards = await Promise.all(
        ids.map(async (id) => {
            const board = await redisClient.hGetAll(`board:${id}`);
            return { id, ...board };
        })
    );
    return boards;
};

/**
 * 특정 ID의 게시글 조회
 */
exports.findById = async (id) => {
    const board = await redisClient.hGetAll(`board:${id}`);
    return board.title ? { id, ...board } : null;
};

/**
 * 특정 게시글 삭제
 */
exports.deleteById = async (id) => {
    const board = await redisClient.hGetAll(`board:${id}`);
    if (!board.title) return false;

    await redisClient.del(`board:${id}`);
    await redisClient.lRem(BOARD_LIST_KEY, 0, id);
    return true;
};
