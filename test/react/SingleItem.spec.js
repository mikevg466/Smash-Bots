import React from 'react';
import chai, {expect} from 'chai';
import spies from 'chai-spies';
import {shallow} from 'enzyme';
import SingleItem from '../../client/components/SingleItem';

chai.use(spies);
const spy = chai.spy(() => {});

describe('Item component', () => {

  let singleItem;
  const selectedItem = {
    id: 1,
    name: 'Sword',
    graphic: 'http://store.hbo.com/imgcache/product/resized/000/499/553/catl/game-of-thrones-longclaw-letter-opener_1000.jpg?k=2f027467&pid=499553&s=catl&sn=hbo',
    price: 100
  };
  const user = {
    gold: 500,
    items: [
      {
        id: 2,
        name: 'Axe',
        graphic: 'http://store.hbo.com/imgcache/product/resized/000/499/553/catl/game-of-thrones-longclaw-letter-opener_1000.jpg?k=2f027467&pid=499553&s=catl&sn=hbo',
        price: 100
      }
    ]
  };

  beforeEach('Create component', () => {
    singleItem = shallow(
      <SingleItem
        user={user}
        selectedItem={selectedItem}
        handleBuy={spy}
      />
    );
  });

  it('should be a div with an image object, button, and heading', () => {
    expect(singleItem.is('div')).to.equal(true);
    expect(singleItem.find('img').length).to.equal(1);
    expect(singleItem.find('a').length).to.equal(1);
    expect(singleItem.find('h3').length).to.equal(1);
  });
  it('image should use the seletedItem\'s url', () => {
    expect(singleItem.find('img').prop('src')).to.equal(selectedItem.graphic);
  });
  // it('button data should display selectedItem\'s price', () => {
  //   expect(singleItem.find('a').prop('data')).to.equal(selectedItem.price);
  // });
  it('heading should display the selectItem\'s name', () => {
    expect(singleItem.find('h3')).to.have.html('<h3>Sword</h3>');
  });
  it('Button should display price and have bootstrap button class', () => {
    expect(singleItem.find('a')).to.have.html('<a class="btn btn-success">100</a>')
  });
  it('Button should call handleBuy prop', () => {
    singleItem.find('a').simulate('click');
    expect(spy).to.have.been.called();
  });
}); // end describe ('SingleItem component');
