import React from 'react';
import { connect } from 'react-redux';
import {equipWeapon, equipArmor} from '../redux/user';

export class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equippedWeapon: {},
            equippedArmor: {},
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
      this.setState({
        equippedWeapon: this.props.user.equippedWeapon,
        equippedArmor: this.props.user.equippedArmor
      });
    }

    handleChange(event) {
      console.log(event.target.id);
      this.setState({
        [event.target.id]: this.props.user.purchasedItems
          .find(item => Number(item.id) === Number(event.target.value))
      });
    }

    onSubmit(){
      this.props.handleSubmit(this.props.user, this.state.equippedWeapon, this.state.equippedArmor)
    }

    render() {
      console.log('weapon', this.props.user.equippedWeapon);
      return (
      <div>
        <form>
              <div>
                <label>Choose Weapon:</label>
                <div>
                  <input type="text" value={ this.state.equippedWeapon.name }/>
                  <select id="equippedWeapon" defaultValue={this.state.equippedWeapon.id} onChange={this.handleChange}>
                    {this.props.user.purchasedItems &&
                    this.props.user.purchasedItems
                      .filter(item => item.type === 'weapon')
                      .map((item) => (
                        <option
                          key={item.id}
                          value= {item.id}>
                            {item.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div>
                <label>Choose Armor:</label>
                <div>
                  <select id="equippedArmor" value={this.state.equippedArmor.id} onChange={this.handleChange}>
                    {this.props.user.purchasedItems &&
                    this.props.user.purchasedItems
                      .filter(item => item.type === 'armor')
                      .map((item) => (
                        <option
                          key={item.id}
                          value= {item.id}>
                            {item.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
                <a
                  onClick={this.onSubmit}
                  className="btn btn-success">Equip
                </a>
        </form>
      </div>)
    }
  }

const mapState = state => {
    return {
      user: state.user
    }
};
const mapDispatch = dispatch => ({
   handleSubmit: (user, weapon, armor) => {
    console.log('weapon', weapon);
    console.log('armor', armor);
    weapon.id && dispatch(equipWeapon(user, weapon));
    armor.id && dispatch(equipArmor(user, armor));
   }
});


export default connect(mapState, mapDispatch)(Character);
