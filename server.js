require('dotenv').config(); // dotenv 불러오기

const express = require('express');
const axios = require('axios');
const app = express();

// 네이버 API 인증 정보 (환경 변수에서 불러오기)
const clientId = process.env.CLIENT_ID; // .env 파일에 정의된 CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET; // .env 파일에 정의된 CLIENT_SECRET

// CORS 설정
const cors = require('cors');
app.use(cors());

// 검색 API 엔드포인트
app.get('/search', async (req, res) => {
  const { query, display, start } = req.query;

  // 네이버 API 호출
  try {
    const response = await axios.get('https://openapi.naver.com/v1/search/webkr.json', {
      params: {
        query,
        display,
        start
      },
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret
      }
    });

    // API 결과를 클라이언트에 반환
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Naver API:', error);
    res.status(500).send('API 호출 실패');
  }
});

// 서버 포트 설정
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://10.70.6.134:${port}`);
});
