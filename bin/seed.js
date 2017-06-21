
const db = require('../server/db/db');
const Page = require('../server/db/models').Page;
const Promise = require('bluebird');

const data = {
  dummy: [
    {},
  ]
};


db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting seed data");
  return Promise.map(Object.keys(data), name => {
    return Promise.map(data[name], item => {
      return db.model(name).create(item);
    });
  });
})
.then(() => {
  console.log("Finished inserting seed data");
})
.catch(console.error.bind(console))
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});
