const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server');
const User = db.model('user');
const Item = db.model('item');

const mikesEmail = 'mike@bashbots.com';
let mike, testItems;
const testList = [
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
    name: 'Steel armor',
    graphic: 'http://test3.com',
    price: 10000
  }
];

describe('User routes', () => {

  beforeEach('Sync and load Database', () => {
    return db.sync({ force: true })
    .then(() => Promise.all([
      User.create({
        name: 'Mike',
        email: mikesEmail,
        password: 'test',
        username: 'coolname',
        weapon: 123,
        armor: 345,
        gold: 4,
        level: 8,
        experience: 15
      }),
      Item.create(testList[0]),
      Item.create(testList[1]),
      Item.create(testList[2])
    ]))
    .then(([user, itemOne, itemTwo, itemThree]) => {
      mike = user;
      testItems = [itemOne, itemTwo, itemThree];
    });
  });

  describe('/api/users/', () => {
    it('GET all users through /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(mikesEmail);
        });
    });
  }); // end describe('/api/users')

  describe('/api/users/:userId', () => {
     it('GET one user including item association through /api/users/:userId', () => {
      return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(res => {
          expect(res.body.email).to.be.equal(mikesEmail);
        });
    });

    // Is this needed? Items eager loaded with user and should be saved in redux store
    xit('GET all users\'s items through /api/users/:userId/items', () => {
      return Promise.all([
        mike.addItem(testItems[0]),
        mike.addItem(testItems[1]),
        mike.addItem(testItems[2])
      ])
      .then(() => {
        return request(app)
          .get('/api/users/1/items')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(3);
          });
      });
    });

    it('POST to purchase an item through /api/users/:userId/items', () => {
      return User.findOne({ where: { email: mikesEmail }})
        .then(user => {
        return request(app)
        .post('/api/users/' + user.id)
        .send(testItems[0])
        .expect(201)
        .then(res => {
          expect(res.body.Items.some(item => item.name === 'Thor\'s Hammer')).to.equal(true);
        });
      });
    });

    // Status code 201 does not give a response.  Using 200
    //    https://developer.yahoo.com/social/rest_api_guide/http-response-codes.html
    it('PUT to update Gold through /api/users/:userId/gold', () => {
      return User.findOne({where: { email: mikesEmail}})
      .then(user => {
        var currentGold = user.gold;
        return request(app)
        .put(`/api/users/${user.id}/gold`)
        .send({
          gold: currentGold + 50
        })
        .expect(200)
        .then(res => {
          expect(res.body.gold).to.equal(currentGold + 50);
        });
      });
    });

    it('PUT to update level through /api/users/:userId/level', () => {
      return User.findOne({where: { email: mikesEmail}})
      .then(user => {
        var currentLevel = user.level;
        return request(app)
        .put(`/api/users/${user.id}/level`)
        .send({
          level: currentLevel + 1
        })
        .expect(200)
        .then(res => {
          expect(res.body.level).to.equal(currentLevel + 1);
        });
      });
    });

    it('PUT to update experience through /api/users/:userId/experience', () => {
      return User.findOne({where: { email: mikesEmail}})
      .then(user => {
        var currentExperience = user.experience;
        return request(app)
        .put(`/api/users/${user.id}/experience`)
        .send({
          experience: currentExperience + 200
        })
        .expect(200)
        .then(res => {
          expect(res.body.experience).to.equal(currentExperience + 200);
        });
      });
    });

    // If purchased item association is considered a POST, weapon and armor hasOne association
    //   should be as well.  Also, purchased item sends whole item so sending whole as well
    //    for consistency
    it('POST to update a weapon association through /api/users/:userId/weapon', () => {
      return User.findOne({where: {email: mikesEmail}})
      .then(user => {
        return request(app)
        .put(`/api/users/${user.id}/weapon`)
        .send({
          weapon: testItems[0]
        })
        .expect(201)
        .then(res => {
          // result is user object with items eager loaded:
          expect(res.body.weapon).to.be.an('object');
          expect(res.body.weapon).to.equal(testItems[0]);
          expect(res.body.weapon.name).to.equal('Thor\'s Hammer');
          expect(res.body.weapon.type).to.equal('weapon');
        });
      });
    });

    it('POST to update an armor association through /api/users/:userId/armor', () => {
      return User.findOne({where: {email: mikesEmail}})
      .then(user => {
        return request(app)
        .put(`/api/users/${user.id}/armor`)
        .send({
          armor: testItems[2]
        })
        .expect(201)
        .then(res => {
          // result is user object with items eager loaded:
          expect(res.body.armor).to.be.an('object');
          expect(res.body.armor).to.equal(testItems[2]);
          expect(res.body.armor.name).to.equal('Steel armor');
          expect(res.body.armor.type).to.equal('armor');
        });
      });
    });
  }); // end describe('/api/users/:userId')
}); // end describe('User routes')
