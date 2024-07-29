import React from 'react'
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import CharacterSelection from '../components/CharacterSelection';
import Rules from '../components/Rules';

const MainBox = styled(Box)({
    height: '90%',
    width: '80%',
    border: '1px solid',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

const DashBoard = () => {

    return(
        <MainBox>
            <Box sx={{width:'100%',height:'20%'}}>Title</Box>
            <Box sx={{width:'100%',height:'75%',display:'flex', justifyContent:'space-around',alignItems:'center'}}>
                <CharacterSelection/>
                <Rules/>
            </Box>
        </MainBox> 
    )
}

export default DashBoard