import React from 'react';
import { connect } from 'react-redux';
import PhaserGame from './PhaserGame';
import { recieveMessage } from '../redux/lobby';
import { processInitPlayers, setPlayer, startGame, setWinner } from '../redux/game';
import { emitChatMessage, emitStartGame, onInitGame, onAddChatMessage, onInitPlayers, onPlayerAssignment } from '../sockets/client';

// Component //

export class Lobby extends React.Component{
  constructor(){
    super();
    this.state = {
      inputVal: '',
      currentUsers: []
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

    emitChatMessage('has joined the room!', this.props.username);
    var currentUsersPlusMe = this.state.currentUsers
    currentUsersPlusMe.push(this.props.username)
    this.setState({
      currentUsers: currentUsersPlusMe
    })
  }

  startGame(){
    this.props.initializeWinner();
    emitStartGame();
  }

  processMessage(msg, username){
    this.props.handleMessage({ msg, username });
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
    emitChatMessage(this.state.inputVal, this.props.username);
  }

  render(){
    const isGamePlaying = this.props.isGamePlaying;
    console.log(this.state)
    return (
      <div>
        {isGamePlaying ?
          <PhaserGame /> :
          <div>
            <div>
            {
              this.props.messages.map((message, idx) => (
                <p key={idx}>
                  {message.username + ": "}
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
        <div>
        <h4> Current Users :</h4>
          <ul>
            {
              this.state.currentUsers.length ?
              this.state.currentUsers.map((username)=>{
                return <li> <h3>{username}</h3></li>
              }) : null
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapState = ({ user, game, lobby }) => ({
  weapon: user.weapon,
  armor: user.armor,
  username: user.username,
  isGamePlaying: game.isGamePlaying,
  messages: lobby.messages,
  winner: game.winner,
});

const mapDispatch = dispatch => ({
  handleMessage: message => dispatch(recieveMessage(message)),
  handleInitPlayers: players => dispatch(processInitPlayers(players)),
  handlePlayerAssignment: playerNumber => dispatch(setPlayer(playerNumber)),
  handleStartGame: () => dispatch(startGame()),
  initializeWinner: () => dispatch(setWinner('')),
})

export default connect(mapState, mapDispatch)(Lobby);
