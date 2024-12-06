require('dotenv').config(); // dotenv �ҷ�����
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();

// ���̹� API ���� ���� (ȯ�� �������� �ҷ�����)
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// CORS ����
app.use(cors());

// ���� ���� ���� (naver.html ����)
app.use(express.static(path.join(__dirname)));

// �˻� API ��������Ʈ
app.get('/search', async (req, res) => {
  const { query, display = 10, start = 1 } = req.query;

  try {
    // ���̹� API ȣ��
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

    // API ����� Ŭ���̾�Ʈ�� ��ȯ
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Naver API:', error.message);
    res.status(500).send('API ȣ�� ����');
  }
});

// ���� ��Ʈ ����
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://10.70.6.134:${port}`);
});
