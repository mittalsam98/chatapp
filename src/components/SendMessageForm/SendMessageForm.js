import React from 'react'

class SendMessageForm extends React.Component {

    state={
        message:''
    }

    handleChange=(e)=>{
        return(
            this.setState({message:e.target.value})
        )
    }

    handleSubmit=(e)=>{
         e.preventDefault();
         this.props.sendMessage(this.state.message);
         this.setState({
             message:''
         })
    }

    render() {
        return (
            <form
            onSubmit={this.handleSubmit}
            className="send-message-form">
                <input
                    disabled={this.props.disabled}
                    placeholder="SendMessageForm"
                    value={this.state.message}
                    onChange={this.handleChange}
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm

