const { JsonDB, Config } = require('node-json-db');
//const { InMemoryDatabase } = require('in-memory-database');

let db = undefined;

function createDB() {
  if (!db) {
    db = new JsonDB(new Config('db.json', true, false, '/'));
    //db = new InMemoryDatabase();
  }
  return db;
}

module.exports = { createDB };
