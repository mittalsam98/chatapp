import React,{Component} from 'react';
import {default as Chatkit} from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator} from './config.js';

import MessageList from './components/MessageList/MessageList'
import SendMessageForm from './components/SendMessageForm/SendMessageForm'
import RoomList from './components/RoomList/RoomList'
import NewRoomForm from './components/NewRoomList/NewRoomList'
import  './style.css';

class App extends Component {
  
  state={
    roomId:null,
    messages:[],
    joinableRooms: [],
    joinedRooms: []
  }

  //************* COMPONENT DID MOUNT ***************** *//

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: 'sachin',
        tokenProvider: new Chatkit.TokenProvider({
            url: tokenUrl
        })
    })
    

    chatManager.connect()
    .then(currentUser => {
      this.currentUser=currentUser;
      this.getRooms();
    })
    .catch(error=>{
      console.log("error on connecting...",error);
    })
}

//************* GET ROOMS ****************** *//

getRooms=()=>{
  this.currentUser.getJoinableRooms()
  .then(joinableRooms => {
      this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
      })
  })
  .catch(err => console.log('error on joinableRooms: ', err))
}

//**************SUBSCRIBE TO ROOM ***************** *//

subscribeToRoom=(roomId)=>{
  this.setState({messages:[]})
  this.currentUser.subscribeToRoom({
    roomId: roomId,
    hooks: {
        onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
          })
        }
    }
})
.then(room => {
  this.setState({
      roomId: room.id
  })
  this.getRooms()
})
.catch(err => console.log('error on subscribing to room: ', err))
}

sendMessage=(text)=>{
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
  })
  }

createRoom=(name)=>{
  this.currentUser.createRoom({
    name
  })
  .then(room => this.subscribeToRoom(room.id))
  .catch(err => console.log('error with createRoom: ', err))

}

  render(){
    return (
      <div className='app'>
          <RoomList 
             roomId={this.state.roomId}
             subscribeToRoom={this.subscribeToRoom}
             rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
          <MessageList 
          roomId={this.state.roomId}
          message={this.state.messages} />
          <SendMessageForm  
           disabled={!this.state.roomId}
          sendMessage={(text)=>this.sendMessage(text)}/>
          <NewRoomForm  createRoom={this.createRoom}/>
      </div>
  );
}
}

export default App;



// const chatManager = new Chatkit.ChatManager({
//   instanceLocator,
//   userId: 'sachin',
//   tokenProvider: new Chatkit.TokenProvider({
//       url: tokenUrl
//   })
// })


// sendMessage=(text)=>{
//   chatManager.connect()
//   .then(currentUser =>{
//     currentUser.sendMessage({
//     text,
//     roomId: "43fcd846-d494-4650-a32a-dad675b26c13"
// })
// })
// }