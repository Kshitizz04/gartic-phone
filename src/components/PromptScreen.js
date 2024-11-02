import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useGame, useRoom, useSelf } from '../app-state/store'
import styled from 'styled-components'
import { socket } from '../socket';

const StyledTextField = styled(TextField)({
  width:'100%',
  backgroundColor:'rgba(255, 255, 255, .3)',
  border: '100px solid rgba(255, 255, 255, .7)',
  borderRadius: '2px',
  input: {color:'rgba(255, 255, 255, .8)', fontFamily:'"Itim", cursive'},
  ":hover":{
      border: '0px',
  },
  "&. css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":{
      padding:'2px',
  },
  "& .MuiOutlinedInput-root":{
      "&.Mui-focused fieldset":{
          border:'2px solid rgba(255, 255, 255, .7)',
      }
  }
})

const PromptScreen = () => {
  const game = useGame((state)=>{return state})
  const [myPrompt,setMyPrompt] = useState("") 
  const roomCode = useRoom((state)=>{return state.code})
  const id = useSelf((state)=>{return state.id})

  const RoundOneScrean = ()=>{
    return(
      <Box>
        <Typography fontSize={'40px'} color={'#5cffb6'} sx={{textShadow:'-1px -1px 0px black,1px -1px 0px black,-1px 1px 0px black,1px 1px 0px black', fontFamily:'"Itim", cursive'}}>Write an interesting sentence!!</Typography>
        <StyledTextField
          autoFocus
          value = {myPrompt}
          onChange = {(e)=>{setMyPrompt(e.target.value)}}
        />
        <IconButton edge='start' onClick={()=>{handleDone()}} >
          <Button sx={{backgroundColor:'white', color:'blue'}}>
            <Typography fontFamily={'"Itim", cursive'} color={'darkblue'} fontSize={'20px'}>Done</Typography>
          </Button>
        </IconButton>
      </Box>
    )
  }

  const RegularScreen = ()=>{
    return(
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box sx={{
            width:'90%',
            height:'85%',
            backgroundColor:'rgba(255, 255, 255, .7)',
            border: '2px solid #301a6b',
            borderRadius: '10px',
            marginBottom: '5px',
            padding: '10px',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <img src={game.image} alt=''></img>
        </Box>

        <Box sx={{width:'100%'}}>
          <StyledTextField
            autoFocus
            value = {myPrompt}
            onChange = {(e)=>{setMyPrompt(e.target.value)}}
          />
          <IconButton edge='start' onClick={()=>{handleDone()}} >
            <Button sx={{backgroundColor:'white', color:'blue'}}>
              <Typography fontFamily={'"Itim", cursive'} color={'darkblue'} fontSize={'20px'}>Done</Typography>
            </Button>
          </IconButton>
        </Box>
      </Box>
    )
  }

  const handleDone = ()=>{
    socket.emit('sendPrompt', {id: id, room: roomCode, prompt: myPrompt})
    setMyPrompt("")
    game.setIsDraw()
    game.setRound()
  }

  return (
    <Box 
        sx={{
            height:'95%', 
            width:'60%', 
            backgroundColor:'rgba(38, 28, 92, .5)',
            borderRadius:'10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}
    >
      {game.round==1 ? <RoundOneScrean/> : <RegularScreen/>}
    </Box>
  )
}

export default PromptScreen