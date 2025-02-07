const boardService = require("./boardService");
const ApiResponse = require("../response/ApiResponse");

exports.save = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json(ApiResponse.failure("제목과 내용을 입력하세요.", 400));
        }

        const result = await boardService.save(title, content);
        res.json(ApiResponse.success(result));
    } catch (error) {
        console.error("게시글 저장 오류:", error);
        res.status(500).json(ApiResponse.failure("서버 오류", 500));
    }
};

exports.findAllWithPagination = async (req, res) => {
    try {
        const result = await boardService.findAllWithPagination();
        res.json(ApiResponse.success(result));
    } catch (error) {
        console.error("게시글 목록 조회 오류:", error);
        res.status(500).json(ApiResponse.failure("서버 오류", 500));
    }
};

exports.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await boardService.findById(id);

        if (!result) {
            return res.status(404).json(ApiResponse.failure("게시글을 찾을 수 없습니다.", 404));
        }

        res.json(ApiResponse.success(result));
    } catch (error) {
        console.error("게시글 조회 오류:", error);
        res.status(500).json(ApiResponse.failure("서버 오류", 500));
    }
};

exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await boardService.deleteById(id);

        if (!success) {
            return res.status(404).json(ApiResponse.failure("게시글을 찾을 수 없습니다.", 404));
        }

        res.json(ApiResponse.success(null, "게시글 삭제 완료"));
    } catch (error) {
        console.error("게시글 삭제 오류:", error);
        res.status(500).json(ApiResponse.failure("서버 오류", 500));
    }
};
