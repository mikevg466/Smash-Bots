import React from 'react';
import PropTypes from 'prop-types';
import Lobby from './Lobby';
import { connect } from 'react-redux';
import store from '../store';
import { enterLobby } from '../redux/lobby';

export class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLobby: false
    }
    this.updateClients = this.updateClients.bind(this);
    this.initLobby = this.initLobby.bind(this);
  }

updateClients(){
  client.on('update', curRooms => {
    this.props.onLoadRooms(curRooms)
  });
}

initLobby(){
  this.props.onEnterLobby();
  this.setState({
    showLobby: true
  });
}

componentDidMount(){
  this.updateClients();
}

  render() {
    return (
      <div>
        {!this.state.showLobby ? (
        <div>
        <table>
          <tbody>
            {this.state.rooms && this.state.rooms.map(room => (
              <tr key={room}>
                <td> {room} </td>
                <td> {/*room.clients.length /10*/}</td>
                <td>
                  <button
                    onClick={() => {
                      client.emit('join', room, this.props.weapon, this.props.armor)
                      this.initLobby()
                    }}
                    >
                    Join Room
                  </button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
        <button
          onClick={() => {
            client.emit('join', null, , this.props.weapon, this.props.armor)
            this.initLobby()
          }}
          >
          Create Lobby
        </button>
        </div>
      ) : <Lobby
            client={client}
          />
        }
      </div>
    )
  }
}

const mapUserState = ({ user, lobby }) => ({
  weapon: user.weapon,
  armor: user.armor,
  rooms: lobby.rooms
});

const mapDispatch = dispatch => ({
  onEnterLobby: () => dispatch(enterLobby()),
  onLoadRooms: rooms => dispatch(loadRooms(rooms))
})

export default connect(mapUserState, mapDispatch)(Room);
