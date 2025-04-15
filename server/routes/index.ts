export default defineEventHandler(async (event) => {
  const peek = getQuery(event).peek as string;
  if (!peek) return { message: 'No peek param' };

  const tree = await $fetch('/api/from-url', {
    query: { url: peek },
    baseURL: 'http://localhost:3000',
  });

  return tree;
});
