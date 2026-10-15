import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../src/app.js';

let server;
let base;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api/workspaces`;
});

after(() => server.close());

const send = (method, body) => ({
  method,
  headers: { 'content-type': 'application/json' },
  body: body === undefined ? undefined : JSON.stringify(body),
});

test('GET /workspaces returns a list', async () => {
  const res = await fetch(base);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body.data));
});
