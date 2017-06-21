const app = require('../../server');
const agent = require('supertest').agent(app);
const expect = require('chai').expect;
const db = require('../../server/db');
const Pet = require('../../server/db/models/pet');

describe('Pet Routes', () => {
  let singlePet;
  const petList = [
    {
      name: 'Max',
      image: 'http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-15.jpg',
      age: 1,
      breed: 'puff ball',
      description: 'Cute and fast!'
    },
    {
      name: 'Spike',
      image: 'https://s-media-cache-ak0.pinimg.com/736x/a2/42/d5/a242d5a7fca86aeda26676c8627e82c0.jpg',
      age: 8,
      breed: 'French Bull',
      description: 'Always happy!'
    },
    {
      name: 'Snowball',
      image: 'https://s-media-cache-ak0.pinimg.com/736x/13/04/18/130418ded199cdc061e2ce711c9092fd.jpg',
      age: 4,
      breed: 'Persian Fluff',
      description: 'Loves blowdryers!'
    },
    {
      name: 'Twitch',
      image: 'http://www.downesvets.co.uk/wp-content/uploads/2015/07/kitten-package1.png',
      age: 1,
      breed: 'Greydon',
      description: 'Super playful and full of energy!'
    }
  ]
  beforeEach(() => {
    return db.sync({force: true})
      .then(() => Promise.all([
          Pet.create(petList[0]),
          Pet.create(petList[1]),
          Pet.create(petList[2])
        ])
      )
      .then(([petOne, petTwo, petThree]) => {singlePet = petOne})
  });
  describe('/api/pets/', () => {
    it('GET returns all pets', () => {
      return agent.get('/api/pets')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(3);
          expect(res.body.some(pet => pet.name === petList[0].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === petList[1].name)).to.equal(true);
          expect(res.body.some(pet => pet.name === petList[2].name)).to.equal(true);
        });
    });
    it('POST adds a new pet to the Pet model', () => {
      return agent.post('/api/pets')
        .send(petList[3])
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          Object.keys(petList[3]).forEach(key => {
            expect(res.body[key]).to.equal(petList[3][key]);
          });
        })
        .then(() => Pet.findOne({where: petList[3]}))
        .then(petResult => {
          expect(petResult).to.be.an('object');
          Object.keys(petList[3]).forEach(key => {
            expect(petResult[key]).to.equal(petList[3][key]);
          });
        });
    });
  }); // end describe('/api/pets/')
  describe('/api/pets/:petId/', () => {
    it('GET returns a single pet from the Pet model', () => {
      return agent.get(`/api/pets/${singlePet.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal(singlePet.name);
          expect(res.body.image).to.equal(singlePet.image);
          expect(res.body.age).to.equal(singlePet.age);
          expect(res.body.description).to.equal(singlePet.description);
        });
    });
    it('PUT updates a pet in the Pet model', () => {
      return agent.put(`/api/pets/${singlePet.id}`)
        .send({name: 'Twitch Jr'})
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal('Twitch Jr');
          expect(res.body.image).to.equal(singlePet.image);
        });
    });
    it('DELETE removes a pet from the Pet model', () => {
      return agent.delete(`/api/pets/${singlePet.id}`)
        .expect(204)
        .then(res => Pet.findById(singlePet.id))
        .then(petResult => {
          expect(petResult).to.be.null;
        });
    });
  }); // end describe('/api/pets/:petId/')
}); // end describe('Pet Routes')
