const { instrument } = require('@socket.io/admin-ui');

const io = require('socket.io')(7070,{
	cors:{
		origin: ["https://admin.socket.io","http://localhost:3000"],        
    	credentials: true 
	}
});

let rooms = [
	// {code: 20,players:[{id: id,name: name},{id: id,name: name}]}                     	         	 
]

io.on('connection',(socket)=>{ 
	socket.on('createRoom',(data,cb)=>{
		const success = rooms.findIndex((room)=>{
			return room.code == data.code
		})
		if(success!=-1){
			cb(-1);
		}
		else{
			rooms.push(
				{code: data.code, players: [{id: 0, name: data.name}]}
			)
			socket.join(data.code);
			io.in(data.code).emit('lobbyUpdate', rooms[0].players) 
			cb(0);    
			
		} 
	}) 

	socket.on('joinRoom',(data,cb)=>{
		const success = rooms.findIndex((room)=>{ 
			return room.code == data.code
		})
		if(success==-1){ 
			cb(success);
		}
		else{ 
			const id = rooms[success].players.length; 
			rooms[success].players.push({id: id, name: data.name});
			socket.join(data.code);
			io.in(data.code).emit('lobbyUpdate', rooms[success].players)  
			cb(id);  
		} 
	})

	socket.on('sendCanvas',(data)=>{
		io.in(data.room).emit('recieveCanvas',{id: data.id, url: data.url})
	})

	socket.on('sendPrompt',(data)=>{
		io.in(data.room).emit('recievePrompt', {id: data.id, prompt: data.prompt})
	})               
})  

instrument(io, {
	auth: false,
	mode: "development",
  });