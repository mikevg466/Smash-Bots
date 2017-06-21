import React from 'react';
import PropTypes from 'prop-types';
import SingleItem from '../components/SingleItem';
import { connect } from 'react-redux';
import { logout } from '../redux/user';

class ItemContainer extends React.Component{
  constructor(){
    super();
  }

  render(){
    return (
      <div>
        <ul>
          {
            this.props.itemsList && this.props.itemsList.map(item => (
              <li>
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
  itemsList: state.item.itemsList;
};

const mapDispatch = dispatch => {};

export default connect(mapState, mapDispatch)(ItemContainer);
