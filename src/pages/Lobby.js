import { Box } from '@mui/material'
import React from 'react'
import Players from '../components/Players'
import RoomSelection from '../components/RoomSelection'

const Lobby = () => {
    return (
        <Box sx={{width:'100%',height:'75%',display:'flex', justifyContent:'space-around',alignItems:'center'}}>
            <Players/>
            <RoomSelection/>
        </Box>
    )
}

export default Lobby