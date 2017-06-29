import React from 'react';
import { connect } from 'react-redux';
import PhaserGame from './PhaserGame';
import { runGame } from '../game/phaser-example'
import { recieveMessage } from '../redux/lobby';
import { onInitGame, emitChatMessage, onAddChatMessage } from '../sockets/client';

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
    this.initGame = this.initGame.bind(this);
    this.processMessage = this.processMessage.bind(this);
  }

  componentDidMount(){
    onAddChatMessage(this.processMessage);
  }

  startGame(){

  }

  initGame(){
    // TODO: add recieve Game state to redux and put as callback here
    onInitGame();
    runGame();
  }

  processMessage(msg, clientId){
    this.props.onRecieveMessage({ msg, clientId });
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
          {
            this.props.messages.map((message, idx) => (
              <p key={idx}>
                {message.clientId}:
                <span>{message.msg}</span>
              </p>
            ))
          }
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
  onRecieveMessage: message => dispatch(recieveMessage(message))
})

export default connect(mapState, mapDispatch)(Lobby);
