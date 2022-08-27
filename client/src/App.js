import './App.css';
import io from "socket.io-client";
import {useState} from "react";
import Chat from "./Chat.js"

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  //function for joining a room
  const joinRoom = () =>{
    if(userName !== "" && room !== ""){
      //connecting the frontend to backend and sending the data to be processed 
      //at backend through emit function of socket.io
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
    {!showChat? (
      <div className="joinChatContainer">
        <h1>Join a chat</h1>
        <input type="text" placeholder="enter name" onChange={(event) =>{
            setUserName(event.target.value);
        }}/>
        <input type="text" placeholder="enter room id" onChange={(event) =>{
            setRoom(event.target.value);
        }} />
        <button onClick={joinRoom}>Join a room</button>
      </div>
    ) : (
        <Chat
          socket={socket}
          userName={userName}
          room={room} 
        />
    )}
    </div>
  );
}

export default App;
