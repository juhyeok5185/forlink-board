const { createClient } = require("redis");

const redisConfig = createClient({
    socket: { host: "localhost", port: 6379 }
});

redisConfig.on("error", (err) => console.error("❌ Redis 연결 오류:", err));

(async () => {
    await redisConfig.connect();
    console.log("✅ Redis 연결 성공!");
})();

module.exports = redisConfig;
