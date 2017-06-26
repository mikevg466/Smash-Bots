import React from 'react';

// Component //

export default class Game extends React.Component{
  constructor(){
    super();
    this.state = {
      inputVal: '',
      messages: [],
      clientsList: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addChatMessage = this.addChatMessage.bind(this);
    this.showClients = this.showClients.bind(this);
  }

  componentDidMount(){
    this.addChatMessage();
    this.showClients();
  }

  showClients(){
    console.log('heyyyyyy',this.props.client);

  }

  addChatMessage(){
    this.props.client.on('addChatMessage', (msg, clientId) => {
      const msgId = this.state.messages.length
      const messageList = this.state.messages.slice(0);
      messageList.push({
        msgId,
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
        <div>
          {
            
          }
        </div>
        <div>
          {
            this.state.messages.map(message => (
              <p key={message.msgId}>
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
      </div>
    )
  }
}


