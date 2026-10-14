export const fields = {
  title: { type: 'string', required: true, max: 120 },
  description: { type: 'string', required: false, max: 2000 },
  status: { type: 'string', required: false, max: 20 },
};
