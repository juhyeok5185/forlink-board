const express = require("express");
const cors = require("cors");
const {createClient} = require('redis');
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors()); // ✅ CORS 미들웨어 추가
app.use(express.json()); // ✅ JSON 요청 파싱
app.use(express.urlencoded({ extended: true })); // ✅ x-www-form-urlencoded 요청 파싱

const redisClient = createClient({
    socket: {
        host: "localhost",
        port: 6379
    }
});

redisClient.on("error", (err) => console.error("❌ Redis 연결 오류:", err));

(async () => {
    await redisClient.connect(); // Redis 연결
    console.log("✅ Redis 연결 성공!");
})();


app.get("/redis", async (req, res) => {
    try {
        const value = await redisClient.get("mykey");
        res.json({ key: "mykey", value });
    } catch (error) {
        console.error("❌ Redis GET 오류:", error);
        res.status(500).json({ error: "Redis GET 실패" });
    }
});

app.listen(port);
