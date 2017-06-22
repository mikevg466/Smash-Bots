import React from 'react';
import PropTypes from 'prop-types';
import SingleItem from '../components/SingleItem';
import { connect } from 'react-redux';
import { logout } from '../redux/user';
import {fetchItems } from '../redux/item';

export class ItemContainer extends React.Component{
  constructor(){
    super();
  }

  componentDidMount() {
    this.props.loadItems();
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
  itemsList: state.item.itemsList
}
};

const mapDispatch = dispatch => ({
  loadItems: () => dispatch(fetchItems())
});

export default connect(mapState, mapDispatch)(ItemContainer);
