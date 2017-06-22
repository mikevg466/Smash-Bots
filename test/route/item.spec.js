const db = require('../../server/db');
const expect = require('chai').expect;
const app = require('../../server');
const agent = require('supertest').agent(app);
const Item = require('../../server/db/models/item');


const testItemList = [
  {
    name: 'Thor\'s Hammer',
    graphic: 'http://test.com',
    price: 500
  },
  {
    name: 'Sword',
    graphic: 'http://test2.com',
    price: 20
  },
  {
    name: 'Axe',
    graphic: 'http://test3.com',
    price: 10000
  }
];

describe('Item Routes', () => {
  beforeEach('Create database and add items', () => {
    return db.sync({force: true})
      .then(() => Promise.all([
        Item.create(testItemList[0]),
        Item.create(testItemList[1]),
        Item.create(testItemList[2])
      ]));
  });

  describe('/api/items', () => {
    it('GET should return an array of all items', () => {
      return agent.get('/api/items')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(3);
          expect(res.body.some(item => item.name === testItemList[0].name)).to.equal(true);
          expect(res.body.some(item => item.name === testItemList[1].name)).to.equal(true);
          expect(res.body.some(item => item.name === testItemList[2].name)).to.equal(true);
        });
    });
  }); // end describe('/api/items')
  describe('/api/items/:itemId', () => {
    it('GET should return single item data', () => {
      return Item.findOne({ where: { name: testItemList[0].name } })
        .then(item => agent.get(`/api/items/${item.id}`))
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          Object.keys(testItemList[0]).forEach(key => {
            expect(res.body[key]).to.equal(testItemList[0][key]);
          });
        });
    });
  }); // end describe('/api/items/:itemId')
}); // end describe('Item Routes')
