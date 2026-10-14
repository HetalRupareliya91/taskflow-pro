import { app } from './app.js';
import { seedAll } from './seed.js';

const port = Number(process.env.PORT ?? 4000);

if (process.env.SEED === '1') {
  const count = await seedAll();
  console.log(`Seeded ${count} records`);
}

app.listen(port, () => console.log(`API listening on http://localhost:${port}/api`));
