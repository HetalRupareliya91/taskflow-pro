// Optional API-key guard: enabled only when the API_KEY env var is set.
export function auth(req, res, next) {
  const key = process.env.API_KEY;
  if (!key || req.get('x-api-key') === key) return next();
  res.status(401).json({ error: 'Unauthorized' });
}
