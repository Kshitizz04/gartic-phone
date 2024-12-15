import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { socket } from '../socket'
import { useNavigate } from 'react-router-dom'
import { useRoom, useSelf } from '../app-state/store'
import styled from 'styled-components'

const StyledTextField = styled(TextField)({
  width:'70%',
  color:'rgba(255, 255, 255, .8)',
  backgroundColor:'rgba(255, 255, 255, .3)',
  border: '2px solid rgba(255, 255, 255, .8)',
  borderRadius: '2px',
  input: {color:'rgba(255, 255, 255, .8)', fontFamily:'"Itim", cursive'},
  "&. css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":{
      padding:'2px',
  },
  "& .MuiOutlinedInput-root":{
      "&.Mui-focused fieldset":{
          border:'none',
      }
  }
})

const RoomSelection = () => {

  const [createCode,setCreateCode] = useState(0)
  const [joinCode,setJoinCode] = useState(0)
  const [isInRoom,setIsInRoom] = useState(false)
  const navigate = useNavigate()
  const name = useSelf((state)=>{return state.name})
  const setCode = useRoom((state)=>{return state.setCode})
  const setId = useSelf((state)=>{return state.setId})


  const roomCode = useRoom((state)=>{return state.code})
  const id = useSelf((state)=>{return state.id}) 
  const handleDisconnect = ()=>{
    socket.emit('client_disconnected',{id:id, code:roomCode});
    socket.disconnect();
  }

  const handleCreateRoom = (e) => {
    setCreateCode(e.target.value)
    socket.connect()
    socket.emit('createRoom',{name: name,code:createCode},(data)=>{
      if(data===0){
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
      if(data!==-1){
        setIsInRoom(!isInRoom)
        setCode(joinCode)
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
    <Box 
      sx={{
        height:'75%', 
        width:'40%', 
        backgroundColor:'rgba(38, 28, 92, .5)',
        borderRadius:'10px',
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding:'5px'
      }}
    >
      <Box
        sx={{
          display:'flex',
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        <Box
          sx={{
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
          }}
        >
          <Typography fontSize={'40px'} color={'#5cffb6'} sx={{textShadow:'-1px -1px 0px black,1px -1px 0px black,-1px 1px 0px black,1px 1px 0px black', fontFamily:'"Itim", cursive'}}>Create Room</Typography>
          <StyledTextField
            onChange={(e)=>{setCreateCode(e.target.value)}}
          >
            Enter room code
          </StyledTextField>
          <IconButton onClick={(e)=>{handleCreateRoom(e)}}>
            <Button sx={{backgroundColor:'white', color:'blue'}}>
              <Typography fontFamily={'"Itim", cursive'} color={'darkblue'} fontSize={'20px'}>Create</Typography>
            </Button>
          </IconButton>
        </Box>

        <Box
          sx={{
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
          }}
        >
          <Typography fontSize={'40px'} color={'#5cffb6'} sx={{textShadow:'-1px -1px 0px black,1px -1px 0px black,-1px 1px 0px black,1px 1px 0px black', fontFamily:'"Itim", cursive'}}>Join Room</Typography>
          <StyledTextField
            onChange={(e)=>{setJoinCode(e.target.value)}}
          >
            Enter room code
          </StyledTextField>
          <IconButton onClick={(e)=>{handleJoinRoom(e)}}>
            <Button sx={{backgroundColor:'white', color:'blue'}}>
              <Typography fontFamily={'"Itim", cursive'} color={'darkblue'} fontSize={'20px'}>Join</Typography>
            </Button>
          </IconButton>
        </Box>
      </Box>

      <Box sx={{width:'100%'}}>
        <IconButton onClick={()=>{handlePlay()}}>
          <Button sx={{backgroundColor:'white', color:'blue'}}>
            <Typography fontFamily={'"Itim", cursive'} color={'darkblue'} fontSize={'20px'}>Play</Typography>
          </Button>
        </IconButton>
        <IconButton onClick={()=>{handleDisconnect()}}>
          <Button sx={{backgroundColor:'white', color:'blue'}}>
            <Typography fontFamily={'"Itim", cursive'} color={'darkblue'} fontSize={'20px'}>Disconnect</Typography>
          </Button>
        </IconButton>
      </Box>
    </Box>
  )
}

export default RoomSelection