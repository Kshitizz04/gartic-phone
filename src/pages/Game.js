import { Box } from '@mui/material';
import React from 'react'
import ReactPainter from "react-painter";
import styled from 'styled-components';
import Players from '../components/Players';
import Canvas from '../components/Canvas';

const MainBox = styled(Box)({
    height: '90%',
    width: '80%',
    border: '1px solid',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
})

const Game = () => {
    return(
        <MainBox>
            <Players/>
            <Canvas/>
        </MainBox>
    )
}

export default Game