import React from 'react';

// Component //

export default class Game extends React.Component{
  constructor(){
    super();
    this.state = {
      inputVal: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addChatMessage = this.addChatMessage.bind(this);
  }

  componentDidMount(){
    this.addChatMessage();
  }

  addChatMessage(){
    this.props.client.on('addChatMessage', (msg, clientId) => {
      const messageList = this.state.messages.slice(0);
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
    return (
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
      </div>
    )
  }
}
