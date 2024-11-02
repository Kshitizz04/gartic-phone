import React from 'react'
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import CharacterSelection from '../components/CharacterSelection';
import Rules from '../components/Rules';
import Logo from '../Images/Logo.webp';

const MainBox = styled(Box)({
    height: '90%',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border:'4px rgba(29, 29, 27, .15) solid',
    boxShadow: 'inset 0px 2px 0px 0px rgba(255, 255, 255, .15), 0px 3px 0px 0px rgba(255, 255, 255, .15)',
    borderRadius: '12px',
})

const TitleBox = styled(Box)({
    width:'100%',
    height:'20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const DashBoard = () => {

    return(
        
        <Box sx={{width:'100%',height:'75%',display:'flex', justifyContent:'space-around',alignItems:'center'}}>
            <CharacterSelection/>
            <Rules/>
        </Box>
    )
}

export default DashBoard