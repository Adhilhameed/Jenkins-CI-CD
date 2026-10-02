const test = require('node:test');
const assert = require('node:assert');
const app = require('./app');

test('health endpoint returns ok', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}/health`);
  const body = await res.json();
  assert.strictEqual(body.status, 'ok');
  server.close();
});
