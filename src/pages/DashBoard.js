import React from 'react'
import { Box } from '@mui/material';
import CharacterSelection from '../components/CharacterSelection';
import Rules from '../components/Rules';

const DashBoard = () => {

    return(
        
        <Box sx={{width:'100%',height:'75%',display:'flex', justifyContent:'space-around',alignItems:'center'}}>
            <CharacterSelection/>
            <Rules/>
        </Box>
    )
}

export default DashBoard