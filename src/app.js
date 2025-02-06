const express = require("express");
const cors = require("cors");
const { createClient } = require("redis");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const redisClient = createClient({
    socket: { host: "localhost", port: 6379 }
});
redisClient.on("error", (err) => console.error("❌ Redis 연결 오류:", err));

(async () => {
    await redisClient.connect();
    console.log("Redis 연결 성공!");
})();

// 라우터 등록
const boardRoutes = require("./board/boardRoutes");
app.use("/board", boardRoutes);

module.exports = app;
