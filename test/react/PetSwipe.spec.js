import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';

import PetSwipe from '../../client/components/PetSwipe';

describe('PetSwipe component', () => {

  let petSwipe;
  const selectedPet = {
    name: 'Max',
    image: 'http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-15.jpg',
    age: 1,
    breed: 'puff ball',
    description: 'Cute and fast!'
  };

  beforeEach('Create component', () => {
    petSwipe = shallow(
      <PetSwipe
        selectedPet={selectedPet}
      />
    );
  });

  it('should be a div with an image object', () => {
    expect(petSwipe.is('div')).to.equal(true);
    expect(petSwipe.find('img').length).to.equal(1);
  });
  it('image should use the seletedPet\'s url', () => {
    expect(petSwipe.find('img').prop('src')).to.equal(selectedPet.image);
  });

}); // end describe('PetSwipe component')
