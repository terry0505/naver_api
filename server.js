require('dotenv').config(); // dotenv 불러오기
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();

// 네이버 API 인증 정보
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

console.log('CLIENT_ID:', clientId);
console.log('CLIENT_SECRET:', clientSecret);

// CORS 설정
app.use(cors({
  origin: 'http://10.70.6.134:3000',
  methods: ['GET'],
}));

// 정적 파일 제공 (naver.html 서빙)
app.use(express.static(path.join(__dirname)));

// 검색 API 엔드포인트
app.get('/search', async (req, res) => {
    const { query, display = 10, start = 1 } = req.query;
  
    console.log('Received query:', query); // 추가 로그
  
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required.' });
    }
  
    try {
      const response = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
        params: { query, display, start },
        headers: {
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('Error calling Naver API:', error.response ? error.response.data : error.message);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.response ? error.response.data : error.message,
      });
    }
  });

// 서버 포트 설정
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://10.70.6.134:${port}`);
});
