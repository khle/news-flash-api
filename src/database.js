const { JsonDB, Config } = require('node-json-db');

let db = undefined;

function createDB() {
  if (!db) {
    db = new JsonDB(new Config('data.json', true, false, '/'));
  }
  return db;
}

module.exports = { createDB };
