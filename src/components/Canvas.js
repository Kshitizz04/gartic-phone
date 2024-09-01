import { Box, IconButton } from '@mui/material'
import React from 'react'
import ReactPainter from 'react-painter'
import { socket } from '../socket'
import { useGame } from '../app-state/store'

const Canvas = ({id,roomCode}) => {

  const setIsDraw = useGame((state)=>{return state.setIsDraw})


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
    <Box sx={{width: '500px', height: '500px', border: 'solid black 2px'}}>
        <ReactPainter
            onSave={handleSave}
            render={({ triggerSave, canvas}) => (
                <Box>
                  <Box>{canvas}</Box>
                  <IconButton onClick={triggerSave}>Submit</IconButton>
                </Box>
            )}
            />
    </Box>
  )
}

export default Canvas