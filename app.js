const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello from Jenkins CI/CD! Build v2'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));
if (require.main === module) app.listen(3000, () => console.log('Running on 3000'));
module.exports = app;
