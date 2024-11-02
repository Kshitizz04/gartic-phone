import { Box, Typography } from '@mui/material'
import React from 'react'
import Canvas from './Canvas'

const DrawScreen = ({prompt}) => {
  return (
    <Box 
        sx={{
            height:'95%', 
            width:'60%', 
            backgroundColor:'rgba(38, 28, 92, .5)',
            borderRadius:'10px',
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
            padding:'5px'
        }}
    >
        <Box sx={{
            width:'90%',
            backgroundColor:'rgba(255, 255, 255, .7)',
            border: '2px solid #301a6b',
            borderRadius: '100px',
            marginBottom: '5px',
            padding: '10px',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Typography>{prompt}</Typography>
        </Box>

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
            <Canvas/>
        </Box>
    </Box>
  )
}

export default DrawScreen