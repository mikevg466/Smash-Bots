import React from 'react';
import PropTypes from 'prop-types';
import Lobby from './Lobby';
import { connect } from 'react-redux'
import store from '../store'
const client = io();

export class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      showLobby: false
    }
    this.updateClients = this.updateClients.bind(this);
    this.initLobby = this.initLobby.bind(this);
  }

updateClients(){
  client.on('update', curRoom => {
    this.setState({
      rooms: curRoom
    })
  })
}

initLobby(){
  this.setState({
    showLobby: true
  })
}

componentDidMount(){
  this.updateClients();
  //get the client weapon,armor set it to const
}

  render() {
    console.log('props',this.props)
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
            client.emit('join')
            this.initLobby()
          }}
          >
          Create Lobby
        </button>
        </div>
      ) : <Lobby client={client} />}
      </div>
    )
  }
}

const mapUserState = ({ user }) => ({
  weapon: user.weapon,
  armor: user.armor
});

export default connect(mapUserState)(Room);
