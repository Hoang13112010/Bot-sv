const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Minecraft bot is running!'));
app.listen(3000, () => console.log('Web server chạy tại cổng 3000'));