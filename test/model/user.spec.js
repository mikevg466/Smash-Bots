const { expect } = require('chai');
const db = require('../../server/db');
const User = db.model('user');

describe('User model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('field definitions', () => {

    let testUser;
    beforeEach('create database', () => {
      return db.sync({force: true})
      .then(() =>
        User.create({
          email: 'mike@mikey.michael',
          password: 'password',
          username: 'coolname',
          weapon:  123,
          armor: 456,
          gold: 4,
          level: 8,
          experience: 15
        })
      )
      .then((user) => {
        testUser = user;
      });
    });

    it('should have a email field', () => {
      expect(testUser.email).to.be.a('string');
      expect(testUser.email).to.equal('mike@mikey.michael');
    });
    it('should have a password field', () => {
      expect(testUser.password).to.be.a('string');
      expect(testUser.password).to.equal('password');
    });
    it('should have a username field', () => {
      expect(testUser.username).to.be.a('string');
      expect(testUser.username).to.equal('coolname');
    });
// Should be hasOne Associations instead
//     it('should have a weapon field', () => {
//       expect(testUser.weapon).to.be.a('number');
//       expect(testUser.weapon).to.equal(123);
//     });
//     it('should have a armor field', () => {
//       expect(testUser.armor).to.be.a('number');
//       expect(testUser.armor).to.equal(456);
//       //consider making a text plz
//     });
    it('should have a gold field', () => {
      expect(testUser.gold).to.be.a('number');
      expect(testUser.gold).to.equal(4);
    });
    it('should have a level field', () => {
      expect(testUser.level).to.be.a('number');
      expect(testUser.level).to.equal(8);
    });
    it('should have a experience field', () => {
      expect(testUser.experience).to.be.a('number');
      expect(testUser.experience).to.equal(15);
    });
  });

  describe('validations', () => {
    it('Requires a email field', () => {
      const user = User.build({
        password: 'password',
        username: 'coolname',
      });
      return user.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'email',
                type: 'notNull Violation'
            });
        });
    });
    it('Requires a password field', () => {
      const user = User.build({
        email: 'mike@mikey.michael',
        username: 'coolname',
      });
      return user.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'password',
                type: 'notNull Violation'
            });
        });
    });
    it('Requires a username field', () => {
      const user = User.build({
        email: 'mike@mikey.michael',
        password: 'password'
      });
      return user.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'username',
                type: 'notNull Violation'
            });
        });
  });

  describe('instanceMethods', () => {

    describe('correctPassword', () => {

      let cody;

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user;
          });
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });


    }); // end describe('correctPassword')

  }); // end describe('instanceMethods')

}); // end describe('User model')
