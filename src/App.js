import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("http://localhost:1100");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [displayChat, setDisplayChat] = useState(false);

  const joinroom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setDisplayChat(true);
    }
  }
  return (
    <div className="App">
      {!displayChat ? (
        <div className='joinChatContainer'>
          <h3>Join a room</h3>
          <input type="text" placeholder="John...." onChange={(e) => { setUserName(e.target.value) }} />
          <input type="text" placeholder="Room ID...." onChange={(e) => { setRoom(e.target.value) }} />
          <button onClick={joinroom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={userName} room={room} />
      )}
    </div>
  );
}

export default App;
