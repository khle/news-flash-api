const { createDB } = require('./database');

const getBookmarks = async () => {
  const db = createDB();
  const bookmarks = await db.getData('/bookmarks');
  return bookmarks;
};

const setBookmarks = async bookmarks => {
  const db = createDB();
  await db.push('/bookmarks', bookmarks);
};

module.exports = {
  getBookmarks,
  setBookmarks,
};
