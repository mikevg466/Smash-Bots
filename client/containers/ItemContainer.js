import React from 'react';
import PropTypes from 'prop-types';
import SingleItem from '../components/SingleItem';
import CloudyItem from '../components/CloudyItem';
import { connect } from 'react-redux';
import { logout, purchaseItem, equipWeapon } from '../redux/user';
import { fetchItems } from '../redux/item';

export class ItemContainer extends React.Component{
  constructor(){
    super();
    this.state = {
      prevItem: {},
      curItem: {},
      nextItem: {}
    }

    this.handleBuy = this.handleBuy.bind(this);
    this.getNextItem = this.getNextItem.bind(this);
    this.getPrevItem = this.getPrevItem.bind(this);
  }

  componentWillMount() {
    this.props.loadItems()
      .then(() => this.setState({
        curItem: Object.assign({}, this.props.itemsList[0], {listId: 0}) || {},
        nextItem: Object.assign({}, this.props.itemsList[1], {listId: 1}) || {}
      }))
      .catch(console.error.bind(console));
  }

  getNextItem() {
    if(this.state.nextItem.id){
      const prevItem = this.state.curItem;
      const curItem = this.state.nextItem;
      const nextItem = this.props.itemsList[curItem.listId + 1] ?
        Object.assign({}, this.props.itemsList[curItem.listId + 1], {listId: curItem.listId + 1}) :
        {};
      this.setState({
        prevItem,
        curItem,
        nextItem
      })
    }
  }

  getPrevItem() {
    if(this.state.prevItem.id){
      const nextItem = this.state.curItem;
      const curItem = this.state.prevItem;
      const prevItem = this.props.itemsList[curItem.listId - 1] ?
        Object.assign({}, this.props.itemsList[curItem.listId - 1], {listId: curItem.listId - 1}) :
        {};
      this.setState({
        prevItem,
        curItem,
        nextItem
      })
    }
  }

  handleBuy(item){
    if (this.props.user.gold >= item.price ) {
      this.props.purchase(this.props.user, item);
      if(Object.keys(this.props.user.weapon).length){
        this.props.onFirstPurchase(this.props.user, this.state.weapon, this.state.armor)
      }
    }
  }

  render(){
    return (
      <div className="container">
        <div className="row ">
          <div
            className="col-md-1 glyphicon glyphicon-menu-left vcenter"
            onClick={this.getPrevItem}>
          </div>
          <div className="col-md-2 hidden-sm-down vcenter">
            { this.state.prevItem.id ? <CloudyItem selectedItem={ this.state.prevItem} /> : null }
          </div>
          <div className="col-md-6 col-sm-10">
          {
            this.state.curItem.id &&
              <SingleItem
                selectedItem={this.state.curItem}
                user={this.props.user}
                handleBuy={this.handleBuy}
              />
          }
          </div>
          <div className="col-md-2 hidden-sm-down vcenter">
            { this.state.nextItem.id ? <CloudyItem selectedItem={ this.state.nextItem} /> : null }
          </div>
          <div
            className="col-md-1 glyphicon glyphicon-menu-right vcenter"
            onClick={this.getNextItem}>
          </div>
        </div>
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
  purchase: (user, item) => dispatch(purchaseItem(user, item)),
  onFirstPurchase: (user, weapon, armor) => {
  weapon.id && dispatch(equipWeapon(user, weapon));
  armor.id && dispatch(equipArmor(user, armor));
  }
});

export default connect(mapState, mapDispatch)(ItemContainer);
