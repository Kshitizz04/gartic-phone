import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import ReactPainter from 'react-painter'
import { socket } from '../socket'
import { useGame, useRoom, useSelf } from '../app-state/store'

const canvasHeight = ((window.innerHeight * 90 * 75 * 95 * 85) / 100000000)-30-30
const canvasWidth = ((window.innerWidth * 70 * 60 * 90) / 1000000)-30
const Canvas = () => {

  const setIsDraw = useGame((state)=>{return state.setIsDraw})
  const id = useSelf((state)=>{return state.id})
  const roomCode = useRoom((state)=>{return state.code})


  const handleSave = (blob)=>{
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      socket.emit('sendCanvas', { id, room: roomCode, url: dataUrl });
      setIsDraw();
    };
    reader.readAsDataURL(blob);
  }

  return (
  
    <ReactPainter
      height={canvasHeight}
      width={canvasWidth}
      onSave={handleSave}
      render={({ triggerSave, canvas}) => (
          <Box>
            <Box>{canvas}</Box>
            <IconButton onClick={triggerSave}>
              <Button sx={{backgroundColor:'white', color:'blue'}}>
                <Typography fontFamily={'"Itim", cursive'} color={'darkblue'} fontSize={'20px'}>Done</Typography>
              </Button>
            </IconButton>
          </Box>
      )}
    />
  )
}

export default Canvas