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
        graphic: 'http://orig07.deviantart.net/a821/f/2013/251/c/7/thor_hammer_mjolnir__avengers_version__by_pannaus-d6lir5n.jpg',
        price:  500,
        type: 'weapon',
        description: 'A very good hammer.',
        power: 10,
        unlockLevel: 5
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
      expect(testItem.graphic).to.equal('http://orig07.deviantart.net/a821/f/2013/251/c/7/thor_hammer_mjolnir__avengers_version__by_pannaus-d6lir5n.jpg');
    });
    it('should have a price field', () => {
      expect(testItem.price).to.be.a('number');
      expect(testItem.price).to.equal(500);
    });
    it('should have a type field', () => {
      expect(testItem.type).to.be.a('string');
      expect(testItem.type).to.equal('weapon');
    });
    it('should have a description field', () => {
      expect(testItem.description).to.be.a('string');
      expect(testItem.description).to.equal('A very good hammer.');
      //consider making a text plz
    });
    it('should have a power field', () => {
      expect(testItem.power).to.be.a('number');
      expect(testItem.power).to.equal(10);
    });
    it('should have a unlockLevel field', () => {
      expect(testItem.unlockLevel).to.be.a('number');
      expect(testItem.unlockLevel).to.equal(5);
    });
  }); // end describe 'field definitions'


  describe('validations', () => {
    it('Requires a name field', () => {
      const item = Item.build({
        graphic: 'http://orig07.deviantart.net/a821/f/2013/251/c/7/thor_hammer_mjolnir__avengers_version__by_pannaus-d6lir5n.jpg',
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
    it('Requires a type field', () => {
      const item = Item.build({
        name: 'Sword',
        graphic: 'https://openclipart.org/download/85753/Axe-001.svg'
      });
      return item.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'type',
                type: 'notNull Violation'
            });
        });
    });
    it('Requires a description field', () => {
      const item = Item.build({
        name: 'Sword',
        graphic: 'https://openclipart.org/download/85753/Axe-001.svg'
      });
      return item.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'description',
                type: 'notNull Violation'
            });
        });
    });
    it('Requires a power field', () => {
      const item = Item.build({
        name: 'Sword',
        graphic: 'https://openclipart.org/download/85753/Axe-001.svg'
      });
      return item.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'power',
                type: 'notNull Violation'
            });
        });
    });
    it('Requires a unlockLevel field', () => {
      const item = Item.build({
        name: 'Sword',
        graphic: 'https://openclipart.org/download/85753/Axe-001.svg'
      });
      return item.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'unlockLevel',
                type: 'notNull Violation'
            });
        });
    });
  }); // end describe('validations')

}); // end describe 'item model'
