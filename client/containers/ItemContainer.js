import React from 'react';
import PropTypes from 'prop-types';
import SingleItem from '../components/SingleItem';
import { connect } from 'react-redux';
import { logout, purchaseItem } from '../redux/user';
import { fetchItems } from '../redux/item';

export class ItemContainer extends React.Component{
  constructor(){
    super();

    this.handleBuy = this.handleBuy.bind(this);
  }

  componentDidMount() {
    this.props.loadItems();
  }

  handleBuy(item){
    if (this.props.user.gold >= item.price ) {
      this.props.purchase(this.props.user, item);
    }
  }

  render(){
    return (
      <div>
        <ul>
          {
            this.props.itemsList && this.props.itemsList.map(item => (
              <li key={item.id}>
                <SingleItem
                  selectedItem={item}
                  user={this.props.user}
                  handleBuy={this.handleBuy}
                />
              </li>
          ))
        }
        </ul>
      </div>
    )
  }
}

const mapState = state => {
return {
  itemsList: state.item.itemsList,
  user: state.user
}
};

const mapDispatch = dispatch => ({
  loadItems: () => dispatch(fetchItems()),
  purchase: (user, item) => dispatch(purchaseItem(user, item))
});

export default connect(mapState, mapDispatch)(ItemContainer);
