const { createDB } = require('./database');

const getBookmarks = async () => {
  const db = createDB();
  try {
    const bookmarks = await db.getData('/bookmarks');
    return bookmarks;
  } catch {
    return [];
  }
};

const setBookmarks = async bookmarks => {
  const db = createDB();
  await db.push('/bookmarks', bookmarks);
};

module.exports = {
  getBookmarks,
  setBookmarks,
};
