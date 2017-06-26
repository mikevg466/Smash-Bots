import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {equipWeapon, equipArmor} from '../redux/user';

//TO DO: Make sure equipWeapon/equipArmor functions are named properly

export class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        equippedWeapon: this.props.user.equippedWeapon.id,
        equippedArmor: this.props.user.equippedArmor.id,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        store.dispatch(equipWeapon(this.state.equippedWeapon));
        store.dispatch(equipArmor(this.state.equippedArmor));
    }


    render() {
        return (<form onSubmit={this.handleSubmit}>
              <div>
                <label>Choose Weapon:</label>
                <div>
                  <select id="equippedWeapon" value="this.state.equippedWeapon" onChange={this.handleChange}>
                    {this.props.user.purchasedItems &&
                    this.props.user.purchasedItems.map((item) => {
                      if (item.type === 'weapon') {
                      return (<option
                              key={item.id}
                              value= {item.id}>
                              {item.name}
                              </option>);
                      }}
                      )
                    }
                  </select>
                </div>
              </div>
              <div>
                <label>Choose Armor:</label>
                <div>
                  <select id="equippedArmor" value="this.state.equippedArmor" onChange={this.handleChange}>
                    {this.props.user.purchasedItems &&
                    this.props.user.purchasedItems.map((item) => {
                      if (item.type === 'armor') {
                      return (<option
                                key={item.id}
                                value= {item.id}>
                              {item.name}
                            </option>);
                        }})
                      }
                  </select>
                </div>
              </div>
                <button type="submit" className="btn btn-success">Submit</button>
                </form>)
    }
  }
  
const mapState = state => {
return {
  user: state.user
}
};


export default connect(mapState)(Character);