const boardRepository = require("./boardRepository");

exports.createBoard = async (title, content) => {
    return await boardRepository.save(title, content);
};

exports.getAllBoards = async (start = 0, end = -1) => {
    return await boardRepository.findAll(start, end);
};

exports.getBoardById = async (id) => {
    return await boardRepository.findById(id);
};

exports.deleteBoard = async (id) => {
    return await boardRepository.deleteById(id);
};
