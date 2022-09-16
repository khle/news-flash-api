const { createDB } = require('./database');
const wait = numMs => new Promise(res => setTimeout(() => res(), numMs));

const getBookmarks = async () => {
  const db = createDB();
  try {
    //const bookmarks = await db.getData('/bookmarks');
    await wait(500);
    const bookmarks = db.get('bookmarks');
    return bookmarks ?? [];
  } catch {
    return [];
  }
};

const setBookmarks = async bookmarks => {
  const db = createDB();
  //await db.push('/bookmarks', bookmarks);
  await wait(500);
  db.set('bookmarks', bookmarks);
};

module.exports = {
  getBookmarks,
  setBookmarks,
};
