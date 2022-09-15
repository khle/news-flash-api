const { JsonDB, Config } = require('node-json-db');
//const low = require('lowdb');
//const FileSync = require('lowdb/adapters/FileSync');

let db = undefined;

function createDB() {
  if (!db) {
    db = new JsonDB(new Config('db.json', true, false, '/'));
    //db = new Low(new JSONFile('file.json'));
    //const adapter = new FileSync('db.json');
    //db = low(adapter);
  }
  return db;
}

module.exports = { createDB };
