import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';

import SingleItem from '../../client/components/SingleItem';

describe('Item component', () => {

  let singleItem;
  const selectedItem = {
    name: 'Sword',
    graphic: 'http://store.hbo.com/imgcache/product/resized/000/499/553/catl/game-of-thrones-longclaw-letter-opener_1000.jpg?k=2f027467&pid=499553&s=catl&sn=hbo',
    price: 100
  };

  beforeEach('Create component', () => {
    singleItem = shallow(
      <SingleItem
        selectedItem={selectedItem}
      />
    );
  });

  it('should be a div with an image object, button, and heading', () => {
    expect(singleItem.is('div')).to.equal(true);
    expect(singleItem.find('img').length).to.equal(1);
    expect(singleItem.find('button').length).to.equal(1);
    expect(singleItem.find('h3').length).to.equal(1);
  });
  it('image should use the seletedItem\'s url', () => {
    expect(singleItem.find('img').prop('src')).to.equal(selectedItem.graphic);
  });
  it('button data should display selectedItem\'s price', () => {
    expect(singleItem.find('button').prop('data')).to.equal(selectedItem.price);
  });
  it('heading should display the selectItem\'s name', () => {
    expect(singleItem.find('h3')).to.have.html('<h3>Sword</h3>');
  });
}); // end describe ('SingleItem component');
