const users=[];

const addUser=({id,name,room})=>{
    name=name.trim().toLowerCase();
    room=room.toLowerCase();

    const existingUser=users.find((user)=>user.name===name && user.room===room );

    if(existingUser){
        return ({error:'user already taken'})
    }

    const user={id,name,room};
    users.push(user);
    // user ko as a obj is lie return kr rhe hen ta k 
    // destructure ki ja skre values ko as its is 
    return {user};
}

const removeUser=(id)=>{
    const index=users.findIndex((user)=>user.id===id);
    if(index !== -1){
        users.splice(exits,1)[0];
    }
    
}     

//getuser returns a whole user obj
const getUser=(id)=> users.find( (user) => user.id===id);

//agr user fla'n room(group) me he to us room wale use ko return kr do
const getUserInRoom=()=>users.filter((user)=>user.room ===room);

module.exports={addUser,removeUser,getUser,getUserInRoom};