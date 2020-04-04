const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const router=require('./router');
const {addUser,removeUser,getUser,getUserInRoom} =require('./users');

const port=process.env.PORT || 5000;
 
const app=express();
const server=http.createServer(app);
const io=socketio(server);
var userGlobal,roomGlobal; 
   
io.on('connection',(socket)=>{
    console.log('connection has occured');

    //jab connection establed hota he to us user ka hota he ji ne login kia hota he So id is 
    //returend of that user
    socket.on('join',({name,room},sendme)=>{
        const {error,user}=addUser({id:socket.id,name,room});
        // console.log(socket);
         if(error) return sendme(error); 

        //.emit are the event from backend to frontend
        socket.emit('message',{user:'admin',text:`${user.name} welcome to the room ${user.room}`});//admin ki trf se user ko welcome jo k sabhi ko b pta chle ga
        socket.broadcast.to(user.room).emit('message',`${user.name} has joind the room!`);//besides use everone else will know that flaw'n use has joined the roon
        userGlobal=user.name;
        roomGlobal=user.room;
        socket.join(user.room);
        // sendme('ok he ');
    })    
    //messages from frontend to backend
    socket.on('sendMessage',(message,callback)=>{//one param on 2nd no is that receives the argument, and callback is function that sends data to frontend
        const user=getUser(socket.id);  
        //user = whole obj obj that user
        console.log(userGlobal,roomGlobal,user);
        // io.to(roomGlobal).emit('message',{user:userGlobal,text:message});
        // io.emit('message',{user:user.name,text:message});
        io.to(user.room).emit('message',{user:user.name,text:message});
        callback();//to refresh the input of test editer
    })   
    socket.on('disconnect',()=>{
        console.log('user had left');
    })
})

app.use(router);

server.listen(port,()=>{console.log(`server listin on port ${port}`)});