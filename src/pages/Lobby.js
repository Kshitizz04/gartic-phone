import { Box } from '@mui/material'
import React from 'react'
import Players from '../components/Players'
import styled from 'styled-components'
import RoomSelection from '../components/RoomSelection'

const MainBox = styled(Box)({
    height: '90%',
    width: '80%',
    border: '1px solid',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
})

const Lobby = () => {
    return (
        <MainBox>
            <Players/>
            <RoomSelection/>
        </MainBox>
    )
}

export default Lobby