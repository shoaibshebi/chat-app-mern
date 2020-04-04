import React,{useState} from 'react';
import {Link} from 'react-router-dom'

import './join.css';

const Join=()=>{
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');

    return(
    <div className="joinOuterContainer">
        <div className="joinInnerContainer">
            <h1 id="joinhead" className="heading">join</h1>
            <form>
                <div><input className="name" placeholder="name" type="text" onChange={(e)=>setName(e.target.value)}/></div>
                <div><input className="chat" type="text" placeholder="room" onChange={(e)=>setRoom(e.target.value)}/></div>
                <Link onClick={e=>(!name || !room ? e.preventDefault() : null)} to={`/chat?name=${name}&room=${room}`}>
                    <button id="joinClick" type="submit">Sign in</button>
                </Link>
            </form>
        </div>
    </div>
    );
}

export default Join;