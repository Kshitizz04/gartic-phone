const { instrument } = require('@socket.io/admin-ui');
const dotenv = require('dotenv');
dotenv.config();

const PORT =  process.env.PORT || 7070
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

const io = require('socket.io')(PORT,{
	cors:{
		origin: ["https://admin.socket.io",clientUrl, "http://localhost:3000", "https://gartic-phone-smoky.vercel.app/"],        
    	credentials: true 
	}
});

console.log(`Server listening on ${PORT}`)

let rooms = [     
	// {
	// 	code: 20,
	// 	players:[{id: id,name: name},{id: id,name: name}], 
	//  playerTurns: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
	// 	game:{
	// 			0: {
	// 				0: "prompt1", 
	// 				1: imageURL, 
	// 				2: "prompt2", 
	// 				3: imageURL
	// 			}
	// 			1: {
	// 				0: "prompt1", 
	// 				1: imageURL, 
	// 				2: "prompt2", 
	// 				3: imageURL
    //          }
	//  	}
	// }                     	         	 
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
				{code: data.code, players: [{id: 0, name: data.name}], playerTurns: {0:0},game: {}}
			)
			socket.join(data.code);
			io.in(data.code).emit('lobbyUpdate', rooms[0].players) 
			cb(0);    
			//console.log(rooms);
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
			rooms[success].playerTurns[id] = 0;  
			socket.join(data.code);
			io.in(data.code).emit('lobbyUpdate', rooms[success].players)        
			cb(id);  
			//console.log(rooms)
		} 
	})

	socket.on('sendCanvas',(data)=>{
		const room = rooms.findIndex((room)=>{
			return room.code == data.room
		})
		const turn = rooms[room].playerTurns[data.id]; 
		const update = data.id-turn<0 ? rooms[room].players.length+(data.id-turn) : data.id-turn 

		if(!rooms[room].game[update]){
			rooms[room].game[update]={};
		} 

		rooms[room].game[update][data.id] = data.url;
		rooms[room].playerTurns[data.id]=turn+1; 

		//Round is over when roundOver becomes player count
		let roundsOver = Object.values(rooms[room].playerTurns).every((turn)=>{
			return turn===rooms[room].players.length;
		})
		//console.log(rooms[room].playerTurns,roundsOver)   
		if(roundsOver){ 
			io.in(data.room).emit('roundOver', rooms[room].game)     
		}

		io.in(data.room).emit('recieveCanvas',{id: data.id, url: data.url})
		//console.log(rooms[room].game) 
	})

	socket.on('sendPrompt',(data)=>{
		const room = rooms.findIndex((room)=>{
			return room.code == data.room
		})
		const turn = rooms[room].playerTurns[data.id]; 
		const update = data.id-turn<0 ? rooms[room].players.length+(data.id-turn) : data.id-turn

		if(!rooms[room].game[update]){
			rooms[room].game[update]={};
		} 
		 
		rooms[room].game[update][data.id] = data.prompt;
		rooms[room].playerTurns[data.id]=turn+1;

		//Round is over when roundOver becomes player count
		let roundsOver = Object.values(rooms[room].playerTurns).every((turn)=>{
			return turn===rooms[room].players.length;
		})
		//console.log(rooms[room].playerTurns,roundsOver)   
		if(roundsOver){ 
			io.in(data.room).emit('roundOver', rooms[room].game)     
		}
		 
		io.in(data.room).emit('recievePrompt', {id: data.id, prompt: data.prompt})
		//console.log(rooms[room].game)
	}) 

	socket.on('client_disconnected',(data)=>{
		const room = rooms.findIndex((room)=>{
			return room.code == data.code
		})
		console.log(room,rooms[room].players,rooms[room].playerTurns,rooms[room].game) 

		rooms[room].players.splice(data.id,1);
		delete rooms[room].playerTurns[data.id]

		console.log(room,rooms[room].code,rooms[room].players,rooms[room].playerTurns,rooms[room].game)  
	}) 
})  

instrument(io, { 
	auth: false,
	mode: "development",
  });