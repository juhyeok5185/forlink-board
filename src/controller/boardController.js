const boardService = require("../services/boardService");
const ApiResponse = require("../utils/ApiResponse");

exports.saveBoard = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json(ApiResponse.failure("제목과 내용을 입력하세요.", 400));
        }

        const result = await boardService.createBoard(title, content);
        res.json(ApiResponse.success(result));
    } catch (error) {
        console.error("❌ 게시글 저장 오류:", error);
        res.status(500).json(ApiResponse.failure("서버 오류", 500));
    }
};

exports.getBoardList = async (req, res) => {
    try {
        const result = await boardService.getAllBoards();
        res.json(ApiResponse.success(result));
    } catch (error) {
        console.error("❌ 게시글 목록 조회 오류:", error);
        res.status(500).json(ApiResponse.failure("서버 오류", 500));
    }
};

exports.getBoardById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await boardService.getBoardById(id);

        if (!result) {
            return res.status(404).json(ApiResponse.failure("게시글을 찾을 수 없습니다.", 404));
        }

        res.json(ApiResponse.success(result));
    } catch (error) {
        console.error("❌ 게시글 조회 오류:", error);
        res.status(500).json(ApiResponse.failure("서버 오류", 500));
    }
};

exports.deleteBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await boardService.deleteBoard(id);

        if (!success) {
            return res.status(404).json(ApiResponse.failure("게시글을 찾을 수 없습니다.", 404));
        }

        res.json(ApiResponse.success(null, "게시글 삭제 완료"));
    } catch (error) {
        console.error("❌ 게시글 삭제 오류:", error);
        res.status(500).json(ApiResponse.failure("서버 오류", 500));
    }
};
