import React from 'react';
import { connect } from 'react-redux';
import PhaserGame from './PhaserGame';
import { recieveMessage } from '../redux/lobby';
import { processInitPlayers, setPlayer, startGame } from '../redux/game';
import { emitChatMessage, emitStartGame, onInitGame, onAddChatMessage, onInitPlayers, onPlayerAssignment } from '../sockets/client';

// Component //

export class Lobby extends React.Component{
  constructor(){
    super();
    this.state = {
      inputVal: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startGame = this.startGame.bind(this);
    this.processMessage = this.processMessage.bind(this);
  }

  componentDidMount(){
    onAddChatMessage(this.processMessage);
    onInitPlayers(this.props.handleInitPlayers);
    onPlayerAssignment(this.props.handlePlayerAssignment);
    onInitGame(this.props.handleStartGame);
  }

  startGame(){
    emitStartGame();
  }

  processMessage(msg, clientId){
    this.props.handleMessage({ msg, clientId });
  }

  handleChange(e){
    this.setState({
      inputVal: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({
      inputVal: ''
    })
    emitChatMessage(this.state.inputVal);
  }

  render(){
    const isGamePlaying = this.props.isGamePlaying;
    return (
      <div>
      {isGamePlaying ?
        <PhaserGame /> :
        <div>
          <div>
          {
            this.props.messages.map((message, idx) => (
              <p key={idx}>
                {message.clientId}:
                <span>{message.msg}</span>
              </p>
            ))
          }
          </div>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.inputVal} onChange={this.handleChange}/>
            <button>Send</button>
          </form>
          <button
            onClick= {this.startGame}
          >Start Game</button>
        </div>
      }
      </div>
    )
  }
}

const mapState = ({ user, game, lobby }) => ({
  weapon: user.weapon,
  armor: user.armor,
  isGamePlaying: game.isGamePlaying,
  messages: lobby.messages
});

const mapDispatch = dispatch => ({
  handleMessage: message => dispatch(recieveMessage(message)),
  handleInitPlayers: players => dispatch(processInitPlayers(players)),
  handlePlayerAssignment: playerNumber => dispatch(setPlayer(playerNumber)),
  handleStartGame: () => dispatch(startGame()),
})

export default connect(mapState, mapDispatch)(Lobby);
