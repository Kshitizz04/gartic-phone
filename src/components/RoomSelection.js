import { Box, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { socket } from '../socket'
import { useNavigate } from 'react-router-dom'
import { useRoom, useSelf } from '../app-state/store'

const RoomSelection = () => {

  const [createCode,setCreateCode] = useState(0)
  const [joinCode,setJoinCode] = useState(0)
  const [isInRoom,setIsInRoom] = useState(false)
  const navigate = useNavigate()
  const name = useSelf((state)=>{return state.name})
  const setCode = useRoom((state)=>{return state.setCode})
  const setId = useSelf((state)=>{return state.setId})

  const handleCreateRoom = (e) => {
    setCreateCode(e.target.value)
    socket.connect()
    socket.emit('createRoom',{name: name,code:createCode},(data)=>{
      if(data==0){
        setIsInRoom(!isInRoom)
        setCode(createCode)
        console.log(data)
        setId(data)
      }else{
        console.error('room already exists')
      }
    })
  }
  const handleJoinRoom = (e) => {
    socket.connect()
    socket.emit('joinRoom',{name: name,code:joinCode},(data)=>{
      if(data!=-1){
        console.error('running set',isInRoom)
        setIsInRoom(!isInRoom)
        setCode(joinCode)
        console.log(data)
        setId(data)
      }else{
        console.error('room does not exist')
      }
    })
  }

  const handlePlay = () => {
    isInRoom ? navigate('/game') : console.error('You are not in a room')
  }

  return (
    <Box sx={{height:'75%', width:'40%', border:'2px solid black'}}>
      <Typography>Create Room</Typography>
      <TextField
        onChange={(e)=>{setCreateCode(e.target.value)}}
      >
        Enter room code
      </TextField>
      <IconButton onClick={(e)=>{handleCreateRoom(e)}}>Create</IconButton>
      <Typography>Join Room</Typography>
      <TextField
        onChange={(e)=>{setJoinCode(e.target.value)}}
      >
        Enter room code
      </TextField>
      <IconButton onClick={(e)=>{handleJoinRoom(e)}}>Join</IconButton>
      <IconButton onClick={()=>{handlePlay()}}>Play</IconButton>
    </Box>
  )
}

export default RoomSelection