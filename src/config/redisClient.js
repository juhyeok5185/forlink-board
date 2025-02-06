const { createClient } = require("redis");

const redisClient = createClient({
    socket: { host: "localhost", port: 6379 }
});

redisClient.on("error", (err) => console.error("❌ Redis 연결 오류:", err));

(async () => {
    await redisClient.connect();
    console.log("✅ Redis 연결 성공!");
})();

module.exports = redisClient;
