import { Box } from '@mui/material'
import React, { useState } from 'react'
import Players from '../components/Players'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import RoomSelection from '../components/RoomSelection'
import { socket } from '../socket'

const MainBox = styled(Box)({
    height: '90%',
    width: '80%',
    border: '1px solid',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
})

const Lobby = () => {
    const location = useLocation();
    const [playerList, setPlayerList] = useState([])

    socket.on('lobbyUpdate', (data)=>{
        setPlayerList(data) 
    })

    console.log(playerList)


    return (
        <MainBox>
            <Players players={playerList}/>
            <RoomSelection name={location.state.name}/>
        </MainBox>
    )
}

export default Lobby