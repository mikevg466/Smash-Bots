const db = require('../../server/db');
const chai = require('chai');
const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
const Item = db.model('item');
//item model has:
// ID:
// Name
// graphic
// price

describe('item model', () => {
  let testItem;
  beforeEach('create database', () => {
    return db.sync({force: true})
    .then(() =>
      Item.create({
        name: 'Thor\'s Hammer',
        graphic: 'https://openclipart.org/download/85753/Axe-001.svg',
        price:  500
      })
    )
    .then((item) => {
      testItem = item;
    });
  });

  describe('field definitions', () => {
    it('should have a name field', () => {
      expect(testItem.name).to.be.a('string');
      expect(testItem.name).to.equal('Thor\'s Hammer');
    });
    it('should have a graphic field', () => {
      expect(testItem.graphic).to.be.a('string');
      expect(testItem.graphic).to.equal('https://openclipart.org/download/85753/Axe-001.svg');
    });
    it('should have a price field', () => {
      expect(testItem.price).to.be.a('number');
      expect(testItem.price).to.equal(500);
    });
  }); // end describe 'field definitions'


  describe('validations', () => {
    it('Requires a name field', () => {
      const item = Item.build({
        graphic: 'https://openclipart.org/download/85753/Axe-001.svg',
        price:  500
      });
      return item.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'name',
                type: 'notNull Violation'
            });
        });
    });
    it('Requires a graphic field', () => {
      const item = Item.build({
        name: 'Sword',
        price:  200
      });
      return item.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'graphic',
                type: 'notNull Violation'
            });
        });
    });
    it('Requires a price field', () => {
      const item = Item.build({
        name: 'Sword',
        graphic: 'https://openclipart.org/download/85753/Axe-001.svg'
      });
      return item.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'price',
                type: 'notNull Violation'
            });
        });
    });
  }); // end describe('validations')

}); // end describe 'item model'
