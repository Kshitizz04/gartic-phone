import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import FaceIcon from '@mui/icons-material/Face';
import { useRoom } from '../app-state/store';
import { socket } from '../socket';
import styled from 'styled-components';

const StyledListItem = styled(ListItem)({
    backgroundColor:'rgba(255, 255, 255, .7)',
    border: '2px solid #301a6b',
    borderRadius: '100px 25px 25px 100px',
    marginBottom: '5px',
})

const Players = () => {

    const setPlayers = useRoom((state)=>{return state.setPlayers})
    const players = useRoom((state)=>{return state.players}) 

    socket.on('lobbyUpdate', (data)=>{
        setPlayers(data) 
    })

    return (
        <Box 
            sx={{
                height:'95%', 
                width:'30%', 
                backgroundColor:'rgba(38, 28, 92, .5)',
                borderRadius:'10px',
                display:'flex',
                flexDirection:'column',
                alignItems: 'center',
                padding:'5px'
            }}
        >
            <Typography fontSize={'40px'} color={'#5cffb6'} sx={{textShadow:'-1px -1px 0px black,1px -1px 0px black,-1px 1px 0px black,1px 1px 0px black', fontFamily:'"Itim", cursive'}}>Players {players.length}/10</Typography>
            <List sx={{width:'100%'}}>
                {players.map((player,index)=>{
                    return(
                        <StyledListItem key={index}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FaceIcon sx={{color:'#301a6b'}}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography fontSize={'30px'} color={'#301a6b'} sx={{fontFamily:'"Itim", cursive'}}>{player.name}</Typography>
                            </ListItemText>
                        </StyledListItem>
                    )
                })}
            </List>
        </Box>
    )
}

export default Players