import React from 'react';
import PropTypes from 'prop-types';
import Game from './Game';
const player = io();

export default class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      showGame: false
    }
    this.updatePlayers = this.updatePlayers.bind(this);
    this.initGame = this.initGame.bind(this);
  }

updatePlayers(){
  player.on('update', curRoom => {
    const roomList = Object.keys(curRoom);
    this.setState({
      rooms: roomList
    })
  })
}

initGame(){
  this.setState({
    showGame: true
  })
}

componentDidMount(){
  this.updatePlayers();
}

  render() {
    // this.state.rooms[0] && console.log('roomID', this.state.rooms);
    console.log('playerId', player.id);
    return (
      <div>
        {!this.state.showGame ? (
        <div>
        <table>
          <tbody>
            {this.state.rooms && this.state.rooms.map(room => (
              <tr key={room}>
                <td> {room} </td>
                <td> {/*room.players.length /10*/}</td>
                <td>
                  <button
                    onClick={() => {
                      player.emit('join', room, function(data) {
                        //
                      })
                      this.initGame()
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
            player.emit('host', player.id, function(roomId) {
            })
            this.initGame()
          }}
          >
          Create Game
        </button>
        </div>
         ) : <Game player={player} />}
      </div>
    )
  }
}
