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
    }

    componentWillMount() {
      this.setState({
        equippedWeapon: this.props.user.equippedWeapon,
        equippedArmor: this.props.user.equippedArmor
      });
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    render() {
        return (
      <div> 
        <form>
              <div>
                <label>Choose Weapon:</label>
                <div>
                  <select id="equippedWeapon" value={this.state.equippedWeapon} onChange={this.handleChange}>
                    {this.props.user.purchasedItems &&
                    this.props.user.purchasedItems
                      .filter(item => item.type === 'weapon')
                      .map((item) => (
                        <option
                          key={item.id}
                          value= {item}>
                          {item.name}
                        </option>)
                      )
                    }
                  </select>
                </div>
              </div>
              <div>
                <label>Choose Armor:</label>
                <div>
                  <select id="equippedArmor" value={this.state.equippedArmor} onChange={this.handleChange}>
                    {this.props.user.purchasedItems &&
                    this.props.user.purchasedItems.map((item) => {
                      if (item.type === 'armor') {
                      return (<option
                                key={item.id}
                                value= {item}>
                              {item.name}
                            </option>);
                        }})
                      }
                  </select>
                </div>
              </div>
                <a 
                    onClick={(e) => this.props.handleSubmit(e, this.state.equippedWeapon, this.state.equippedArmor)}
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
   handleSubmit: (e, weapon, armor) => {
       e.preventDefault();
       dispatch(equipWeapon(weapon));
       dispatch(equipArmor(armor));
   }
});


export default connect(mapState, mapDispatch)(Character);
