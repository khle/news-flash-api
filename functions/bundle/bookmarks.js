const { getCollection, initDB, getDB } = require('lokijs-promise');

const getBookmarks = async () => {
  const bookmarkCollection = await getCollection('bookmarks');
  result = bookmarkCollection.find({});
  return result ? result : [];
};

const setBookmarks = async bookmarks => {
  const bookmarkCollection = await getCollection('bookmarks');
  bookmarkCollection.insert(bookmarks);
};

module.exports = {
  getBookmarks,
  setBookmarks,
};
