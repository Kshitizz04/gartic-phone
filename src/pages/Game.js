import { Box } from '@mui/material';
import React from 'react'
import Players from '../components/Players';
import { useGame, useRoom, useSelf } from '../app-state/store';
import { socket } from '../socket';
import { useNavigate } from 'react-router-dom';
import DrawScreen from '../components/DrawScreen';
import PromptScreen from '../components/PromptScreen';


const Game = () => {

    const game = useGame((state)=>{return state})
    const navigate = useNavigate()
    const players = useRoom((state)=>{return state.players})
    const numPlayers = players.length
    const id = useSelf((state)=>{return state.id})

    socket.on('roundOver', (data)=>{
        navigate('/diaries',{state:{data}})
    })

    socket.on('recieveCanvas', (data)=>{
        if((data.id===numPlayers-1) && id===0){
            game.setImage(data.url)
        }
        else if(id === data.id+1){
            game.setImage(data.url)
        }
    })

    socket.on('recievePrompt', (data)=>{
        console.log('myID= ',id, 'player ID= ', data.id, 'num players= ', numPlayers)
        if((data.id===numPlayers-1) && id===0){
            game.setPrompt(data.prompt)
        }
        else if(id === data.id+1){
            game.setPrompt(data.prompt)
        }
    })

    return(
        <Box sx={{width:'100%',height:'75%',display:'flex', justifyContent:'space-around',alignItems:'center'}}>
            <Players/>
            {game.isDraw ? <DrawScreen prompt={game.prompt}/> : <PromptScreen/>}
        </Box>
    )
}

export default Game