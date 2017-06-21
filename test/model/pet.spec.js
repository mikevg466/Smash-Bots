const chai = require('chai');
const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;

const db = require('../../server/db');
const Pet = require('../../server/db/models/pet');

describe('Pet model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('fields', () => {
    let lastPet;
    before(() => {
      return Pet.create({
        name: 'Max',
        image: 'http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-15.jpg',
        age: 1,
        breed: 'puff ball',
        description: 'Cute and fast!'
      })
      .then(pet => lastPet = pet);
    });
    it('has a name field', () => {
      expect(lastPet.name).to.be.a('string');
    });
    it('has an image field', () => {
      expect(lastPet.image).to.be.a('string');
    });
    it('has an age field', () => {
      expect(lastPet.age).to.be.a('number');
    });
    it('has a breed field', () => {
      expect(lastPet.breed).to.be.a('string');
    });
    it('has a description', () => {
      expect(lastPet.description).to.be.a('string');
    });
  }); // end describe('fields')

  describe('validations', () => {
    it('Requires an image field', () => {
      const pet = Pet.build({});
      return pet.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'image',
                type: 'notNull Violation'
            });
        });
    });
  }); // end describe('validations')

  describe('instanceMethods', () => {}); // end describe('instanceMethods')

  describe('classMethods', () => {}); // end describe('classMethods')

}); // end describe('Pet model')
