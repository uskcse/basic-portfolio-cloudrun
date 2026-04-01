const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));

app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio app listening on port ${PORT}`);
});
