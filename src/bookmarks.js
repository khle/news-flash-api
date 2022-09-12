const { getCollection, initDB, getDB } = require('lokijs-promise');

const getBookmarks = async () => {
  const bookmarkCollection = await getCollection('bookmarks');
  return bookmarkCollection.find({});
};

const setBookmarks = async bookmarks => {
  const bookmarkCollection = await getCollection('bookmarks');
  bookmarkCollection.insert(bookmarks);
};

module.exports = {
  getBookmarks,
  setBookmarks,
};
