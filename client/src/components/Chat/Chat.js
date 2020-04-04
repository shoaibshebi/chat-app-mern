import React,{useState,useEffect} from 'react';
import querystring from 'query-string';
import io from 'socket.io-client';
import './chat.css';
import InfoBar from "../infobar/infobar";
import Input from  "../input/input";
import Messages from "../Messages/messages";

const  ENDPOINT='localhost:5000';


let socket;

// WHEN NEW PERSON JOIN CHAT ,/Chat INVOKE AND COMPNENT MOUNT THEN USEEFFECT() RUNS
const Chat=({location})=>{//location actuly coms from router
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);

    //didMount , didUpdate, willUnmount
    useEffect(()=>{
        // const data=querystring.parse(location.search);
        const {name,room}=querystring.parse(location.search);
        // console.log(location);  
        // console.log(data);
        // console.log(name);
        setName(name);
        setRoom(room);

        socket=io(ENDPOINT);
        // console.log(socket);

        socket.emit('join' ,{name,room},(error)=>{
            alert(error);
        });

        //return invoke when component willUnmount
        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT,location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages]); 

            
    const sendMessage=(e)=>{
        e.preventDefault();

        if(message){
            console.log('in the send mesaage ');
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }
 
    // console.log(messages);
    console.log(message,messages);

    
    return (
    <div className="outerContainer">
        <div className="container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
               <Input setMessage={setMessage} sendMessage={sendMessage} message={message} />
        </div>
    </div>
    )
}

export default Chat;


