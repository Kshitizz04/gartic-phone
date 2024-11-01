import { Box, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components';
import Players from '../components/Players';
import Canvas from '../components/Canvas';
import { useGame, useRoom, useSelf } from '../app-state/store';
import { socket } from '../socket';
import { useNavigate } from 'react-router-dom';

const MainBox = styled(Box)({
    height: '90%',
    width: '80%',
    border: '1px solid',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
})

const Game = () => {

    const game = useGame((state)=>{return state})
    const navigate = useNavigate()
    const players = useRoom((state)=>{return state.players})
    const roomCode = useRoom((state)=>{return state.code})
    const numPlayers = players.length
    const id = useSelf((state)=>{return state.id})
    const [myPrompt,setMyPrompt] = useState("") 

    socket.on('roundOver', (data)=>{
        navigate('/diaries',{state:{data}})
    })

    const PromptDisplay = ()=>{
        return(
            <Typography>{game.prompt}</Typography>
        )
    }

    const ImgDisplay = ()=>{
        return(
            <Box>
                <img src={game.image} alt=''/>
            </Box>
        )
    }

    const PromptInput = ()=>{
        return (
            <>
                <TextField
                    autoFocus
                    label='Enter prompt hear'
                    value = {myPrompt}
                    onChange = {(e)=>{setMyPrompt(e.target.value)}}
                />
                <IconButton onClick={(e)=>{handleSubmitPrompt()}}>Submit Prompt</IconButton>
            </>
        )
    }

    const PromptScreen = ()=>{
        return(
            <>
                <ImgDisplay/>
                <PromptInput/>
            </>
        )
    }

    const DrawScreen = ()=>{
        return(
            <>
                <PromptDisplay/>
                <Canvas id={id} roomCode={roomCode}/>
            </>
        )
    }

    const handleSubmitPrompt = ()=>{
        socket.emit('sendPrompt', {id: id, room: roomCode, prompt: myPrompt})
        setMyPrompt("")
        game.setIsDraw()
    }

    socket.on('recieveCanvas', (data)=>{
        if((data.id===numPlayers-1) && id==0){
            game.setImage(data.url)
        }
        else if(id === data.id+1){
            game.setImage(data.url)
        }
    })

    socket.on('recievePrompt', (data)=>{
        console.log('myID= ',id, 'player ID= ', data.id, 'num players= ', numPlayers)
        if((data.id==numPlayers-1) && id==0){
            game.setPrompt(data.prompt)
        }
        else if(id == data.id+1){
            game.setPrompt(data.prompt)
        }
    })

    return(
        <MainBox>
            <Players/>
            <Box sx={{height:'75%', width:'55%', border:'2px solid black'}}>
                {game.isDraw ? <DrawScreen/> : <PromptScreen/>}
            </Box>
        </MainBox>
    )
}

export default Game