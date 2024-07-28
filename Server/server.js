const io = require('socket.io')(7070,{
	cors:{
		origin: 'http://localhost:3000'
	}
});

let rooms = [
	// {code: 20,players:['name1', 'name2']}
]

io.on('connection',(socket)=>{
	socket.on('createRoom',(data,cb)=>{
		const success = rooms.findIndex((room)=>{
			return room.code == data.code
		})
		if(success!=-1){
			cb(false);
		}
		else{
			rooms.push(
				{code: data.code, players: [data.name]}
			)
			socket.join(data.code);
			io.in(data.code).emit('lobbyUpdate', rooms[0].players)
			cb(true);
			
		} 
	}) 

	socket.on('joinRoom',(data,cb)=>{
		const success = rooms.findIndex((room)=>{
			return room.code == data.code
		})
		if(success==-1){ 
			cb(false);
		}
		else{ 
			rooms[success].players.push(data.name);
			socket.join(data.code);
			io.in(data.code).emit('lobbyUpdate', rooms[success].players)  
			cb(true);
		} 
	})
})