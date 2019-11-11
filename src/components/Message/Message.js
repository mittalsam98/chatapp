import React from 'react'

const message=(props) =>{  
        return (
         <div key={props.index} className="message">
             <div className="message-username">{props.username}</div>
             <div className="message-text">{props.text}</div>
         </div>
        )
    }


export default message