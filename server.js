require('dotenv').config(); // dotenv 불러오기
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();

// 네이버 API 인증 정보 (환경 변수에서 불러오기)
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// CORS 설정
app.use(cors());

// 정적 파일 제공 (naver.html 서빙)
app.use(express.static(path.join(__dirname)));

// 검색 API 엔드포인트
app.get('/search', async (req, res) => {
  const { query, display = 10, start = 1 } = req.query;

  try {
    // 네이버 API 호출
    const response = await axios.get('https://openapi.naver.com/v1/search/webkr.json', {
      params: {
        query,
        display,
        start,
      },
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    });

    // API 결과를 클라이언트에 반환
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Naver API:', error.message);
    res.status(500).send('API 호출 실패');
  }
});

// 서버 포트 설정
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://10.70.6.134:${port}`);
});
