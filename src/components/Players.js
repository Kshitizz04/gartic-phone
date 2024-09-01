import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import FaceIcon from '@mui/icons-material/Face';
import { useRoom } from '../app-state/store';
import { socket } from '../socket';
const Players = () => {

    const setPlayers = useRoom((state)=>{return state.setPlayers})
    const players = useRoom((state)=>{return state.players})

    socket.on('lobbyUpdate', (data)=>{
        setPlayers(data) 
    })

    return (
        <Box sx={{height:'75%', width:'40%', border:'2px solid black'}}>
            <List>
                {players.map((player,index)=>{
                    return(
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FaceIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                {player.name}
                            </ListItemText>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}

export default Players