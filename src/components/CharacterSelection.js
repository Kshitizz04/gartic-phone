import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useSelf } from '../app-state/store'

const CharacterSelection = () => {
    const navigate = useNavigate()
    let name = ""
    const setName = useSelf((state)=>{return state.setName})

    return (
        <Box sx={{height:'75%', width:'40%', border:'2px solid black'}}>
            <Card sx={{width:'100%', height:'100%'}} >
                <CardMedia
                    sx={{ height: '70%' }}
                    image="https://img.freepik.com/premium-vector/anonim-gamer-controller-anonymous-gamer-gaming-digital-game-man-technology_165162-737.jpg"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Enter Name
                    </Typography>
                    <TextField
                        autoFocus
                        label="Name..."
                        sx={{ width: '100%' }}
                        onChange={(e)=>{name = e.target.value}}
                        InputProps={{
                            endAdornment: 
                                <IconButton 
                                    onClick={()=>{
                                        setName(name)
                                        navigate('/lobby')
                                    }}
                                >   
                                    Start
                                </IconButton>,
                        }}
                    />
                </CardContent>
            </Card>
        </Box>
    )
}

export default CharacterSelection