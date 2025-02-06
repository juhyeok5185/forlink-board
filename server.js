const app = require("./src/app"); // Express 설정 불러오기

const port = 3000;

app.listen(port, () => {console.log(`🚀 서버 실행 중: http://localhost:${port}`);});
