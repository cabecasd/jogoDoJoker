import React from "react";
import MessageForm from "./MessageForm";


class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      writting: false
    }

    this.fetchMessages = this.fetchMessages.bind(this)
    this.ws = new WebSocket('ws://localhost:8080')
  }

  componentDidMount() {
    this.fetchMessages()
    // this.intervalId = setInterval(this.fetchMessages, 2000)

    this.ws.addEventListener('open',  () => {
      this.ws.send('something');
    });

    this.ws.addEventListener('message', (event) => {
      if (event.data === 'update') {
        this.fetchMessages()
      }
      if (event.data === 'writting') {
        this.setState({writting: true})
      }
      if (event.data === 'not-writting') {
        this.setState({writting: false})
      }
    });
  }

  componentWillUnmount() {
    // clearInterval(this.intervalId)
  }

  fetchMessages() {
    fetch("/api/messages")
      .then(response => response.json())
      .then(json => this.setState({
        messages: json.messages.reverse()
      }))
  }

  render() {
    return (
      <section>
        <MessageForm 
          onFocus={() => this.ws.send('writting')}
          onBlur={() => this.ws.send('not-writting')} />
        {this.state.writting && <p>Alguém a escrever...</p>}
        {
          this.state.messages.length === 0
            ? <p>Não há mensagens.</p>
            : (
              <ul>
                {
                  this.state.messages.map((message, i) => (
                    <li key={i}>
                      {`Nome: ${message.name} | Mensagem: ${message.message}`}
                    </li>
                  ))
                }
              </ul>
            )
        }
      </section>
    )
  }
}

export default Messages