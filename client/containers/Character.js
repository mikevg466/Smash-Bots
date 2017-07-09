import React from 'react';
import { connect } from 'react-redux';
import {equipWeapon, equipArmor} from '../redux/user';

export class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weapon: {},
            armor: {},
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
      if(Object.keys(this.props.user.weapon).length){
        this.setState({
          weapon: this.props.user.weapon,
          armor: this.props.user.armor
        })
      } else if(this.props.user.items.length){
        this.props.handleSubmit(this.props.user, this.props.user.items[0], null)
        this.setState({
          weapon: this.props.user.items[0],
        })
      }
    }

    handleChange(event) {
      this.setState({
        [event.target.id]: this.props.user.items
          .find(item => Number(item.id) === Number(event.target.value))
      });
    }

    onSubmit(){
      this.props.handleSubmit(this.props.user, this.state.weapon, this.state.armor)
    }

    render() {
      return (
      <div>
        <form>
              <div>
                <label>Choose Weapon:</label>
                <div>
                  <select id="weapon" defaultValue={this.props.user.weapon.id} onChange={this.handleChange}>
                    {this.props.user.items &&
                    this.props.user.items
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
                  <select id="armor" value={this.state.armor.id} onChange={this.handleChange}>
                    {this.props.user.items &&
                    this.props.user.items
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
    weapon.id && dispatch(equipWeapon(user, weapon));
    armor && dispatch(equipArmor(user, armor));
   }
});


export default connect(mapState, mapDispatch)(Character);
