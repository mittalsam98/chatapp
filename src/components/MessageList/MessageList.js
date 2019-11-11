import React from 'react';
import ReactDOM from 'react-dom';
import Message from '../Message/Message'

class MessageList extends React.Component {

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }
    
    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight   
        }
    }
    render() {
        if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }

        const message=this.props.message.map((message, index) => {
            return (
                <Message key={index} username={message.senderId} text={message.text}/>    
            )
        });
        
        return (
            <div className="message-list">
                {message}
            </div>
        )
    }
}

export default MessageList