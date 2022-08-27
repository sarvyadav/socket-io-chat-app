import React, {useState, useEffect} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
function Chat({socket, userName, room}) {
    const [currMessage, setCurrMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    
    const sendMessage = async ()=>{
        if(currMessage !== ""){
            const messageData = {
                room : room, 
                author : userName,
                message : currMessage,
                time : 
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes()
            }
            //sends message to the othe person after receinving it from the backend
            await socket.emit("send_message", messageData);
            //updating the message list of sender as well after each message
            setMessageList((list) => [...list, messageData]);
            //to clear the input part of the chat after sending a text
            setCurrMessage("");
        }
    };
//recieving message that was sent by the other end
useEffect(()=>{
    socket.on("receive_message", (data) =>{
        setMessageList((list) => [...list, data]);
    })
}, [socket]);

  return (
    <div className="chat-window">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body">
        <ScrollToBottom className="message-container">
            {/*looping through the list of messages that are stored in our messageList array */}
            {messageList.map((messageContent) => {
                return (
                <div className="message"  id={userName === messageContent.author ? "you" : "other"}> 
                    <div>
                        <div className="message-content"> 
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{messageContent.time}</p>
                            <p id="author"> {messageContent.author}</p>
                        </div>
                    </div>
                </div> 
                );
            })}
            </ScrollToBottom>
         </div>
        <div className="chat-footer">
            <input 
                type="text"
                value={currMessage} 
                placeholder="type a message"
                onChange={(event) =>{
                setCurrMessage(event.target.value);
                }}
                //sends message on pressing enter key
                onKeyDown={(event) =>{
                    event.key === "Enter" && sendMessage();
                }}
            />
            {/* sends message on clicking the arrow */}
            <button onClick={sendMessage}>&#9658;</button>
        </div>

    </div>
  )
}

export default Chat