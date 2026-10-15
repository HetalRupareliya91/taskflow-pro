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

test('POST /workspaces creates a workspace', async () => {
  const res = await fetch(base, send('POST', { title: 'Test workspace' }));
  assert.equal(res.status, 201);
  const { data } = await res.json();
  assert.equal(data.title, 'Test workspace');
  assert.equal(data.status, 'active');
});

test('POST /workspaces rejects invalid input', async () => {
  const res = await fetch(base, send('POST', { status: 'unknown' }));
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.details.title);
  assert.ok(body.details.status);
});
