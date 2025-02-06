// const express = require("express");
// const cors = require("cors");
// const { createClient } = require("redis");
//
// const app = express();
// const port = 3000;
//
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//
// const redisClient = createClient({
//     socket: {
//         host: "localhost",
//         port: 6379
//     }
// });
// redisClient.on("error", (err) => console.error("❌ Redis 연결 오류:", err));
//
// (async () => {
//     await redisClient.connect();
//     console.log("✅ Redis 연결 성공!");
// })();
//
// // ✅ ApiResponse 클래스 추가
// class ApiResponse {
//     constructor(status = 200, message = "Api Success", data = null) {
//         this.status = status;
//         this.message = message;
//         this.data = data;
//     }
//
//     static success(data, message = "Api Success") {
//         return new ApiResponse(200, message, data);
//     }
//
//     static failure(message = "Api Failure", status = 500) {
//         return new ApiResponse(status, message, null);
//     }
// }
//
// /**
//  * 게시글 저장 API
//  */
// app.post("/board/save", async (req, res) => {
//     try {
//         const { title, content } = req.body;
//         if (!title || !content) {
//             return res.status(400).json(ApiResponse.failure("제목과 내용을 입력하세요.", 400));
//         }
//
//         const newId = await redisClient.incr("board:ids");
//
//         await redisClient.hSet(`board:${newId}`, "title", title, "content", content);
//         await redisClient.rPush("board:list", String(newId));
//
//         res.json(ApiResponse.success({ id: newId, title, content }));
//     } catch (error) {
//         console.error("❌ 게시글 저장 오류:", error);
//         res.status(500).json(ApiResponse.failure("서버 오류", 500));
//     }
// });
//
// /**
//  * 전체 게시글 목록 조회 API
//  */
// app.get("/board/list", async (req, res) => {
//     try {
//         const ids = await redisClient.lRange("board:list", 0, -1);
//         const boards = await Promise.all(
//             ids.map(async (id) => {
//                 const board = await redisClient.hGetAll(`board:${id}`);
//                 return { id, ...board };
//             })
//         );
//
//         res.json(ApiResponse.success(boards));
//     } catch (error) {
//         console.error("❌ 게시글 목록 조회 오류:", error);
//         res.status(500).json(ApiResponse.failure("서버 오류", 500));
//     }
// });
//
// /**
//  * 특정 게시글 조회 API
//  */
// app.get("/board/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const board = await redisClient.hGetAll(`board:${id}`);
//
//         if (!board.title) {
//             return res.status(404).json(ApiResponse.failure("게시글을 찾을 수 없습니다.", 404));
//         }
//
//         res.json(ApiResponse.success({ id, ...board }));
//     } catch (error) {
//         console.error("❌ 게시글 조회 오류:", error);
//         res.status(500).json(ApiResponse.failure("서버 오류", 500));
//     }
// });
//
// /**
//  * 게시글 삭제 API
//  */
// app.delete("/board/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const board = await redisClient.hGetAll(`board:${id}`);
//
//         if (!board.title) {
//             return res.status(404).json(ApiResponse.failure("게시글을 찾을 수 없습니다.", 404));
//         }
//
//         await redisClient.del(`board:${id}`);
//         await redisClient.lRem("board:list", 0, id);
//
//         res.json(ApiResponse.success(null, "게시글 삭제 완료"));
//     } catch (error) {
//         console.error("❌ 게시글 삭제 오류:", error);
//         res.status(500).json(ApiResponse.failure("서버 오류", 500));
//     }
// });
//
// app.listen(port, () => {
//     console.log(`🚀 서버 실행 중: http://localhost:${port}`);
// });
