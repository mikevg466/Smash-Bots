import React from 'react';
import PhaserGame from './PhaserGame';
import { runGame } from '../game/phaser-example'
import { recieveMessage } from '../redux/lobby';

// Component //

export default class Lobby extends React.Component{
  constructor(){
    super();
    this.state = {
      inputVal: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addChatMessage = this.addChatMessage.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount(){
    this.addChatMessage();
  }

  startGame(){


  }

  initGame(){
    this.props.client.on('initGame', state => {

    })
    runGame();
  }

  addChatMessage(){
    this.props.client.on('addChatMessage', (msg, clientId) => {
      this.props.onRecieveMessage({ msg, clientId });


      messageList.push({
        msg,
        clientId
      });
      this.setState({
        messages: messageList
      })
    });
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
    this.props.client.emit('chatMessage', this.state.inputVal);
  }

  render(){
    const isGamePlaying = this.props.isGamePlaying;
    return (
      <div>
      {isGamePlaying ?
        <PhaserGame /> :
        <div>
          {
            this.state.messages.map(message => (
              <p key={message.msg}>
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
  onRecieveMessage: () => dispatch(recieveMessage())
})

export const Login = connect(mapState, mapDispatch)(AuthForm);
