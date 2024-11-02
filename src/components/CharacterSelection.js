import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useSelf } from '../app-state/store'
import Character from '../Images/Character.png';
import styled from 'styled-components';

const StyledTextField = styled(TextField)({
    width:'100%',
    backgroundColor:'rgba(255, 255, 255, .3)',
    border: '100px solid rgba(255, 255, 255, .7)',
    borderRadius: '2px',
    input: {color:'rgba(255, 255, 255, .8)', fontFamily:'"Itim", cursive'},
    ":hover":{
        border: '0px',
    },
    "&. css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":{
        padding:'2px',
    },
    "& .MuiOutlinedInput-root":{
        "&.Mui-focused fieldset":{
            border:'2px solid rgba(255, 255, 255, .7)',
        }
    }
})

const CharacterSelection = () => {
    const navigate = useNavigate()
    let name = ""
    const setName = useSelf((state)=>{return state.setName})

    return (
        <Box sx={{
            height:'75%', 
            width:'55%', 
            backgroundColor:'rgba(80,24,81,.25)',
            borderRadius:'10px'
        }}>
            <Box sx={{
                height:'15%',
                width:'100%',
                display:'flex',
                justifyContent:'center',
                alignItems: 'center'
            }}>
                <Typography fontSize={'40px'} color={'#5cffb6'} sx={{textShadow:'-1px -1px 0px black,1px -1px 0px black,-1px 1px 0px black,1px 1px 0px black', fontFamily:'"Itim", cursive'}}>Get Started</Typography>
            </Box>

            <Box sx={{
                height:'70%',
                width:'100%',
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <img src={Character} style={{height:'70%', width:'30%', objectFit:'contain',marginRight:'10%'}}/>
                <Box sx={{width:'50%',display:'flex', justifyContent:'center',alignItems:'center',height:'70%', flexDirection:'column'}}>
                    <Typography fontFamily={'"Itim", cursive'} color={'white'} fontSize={'40px'} width={'100%'}>Choose a nickname</Typography>
                    <StyledTextField
                        onChange={(e)=>{name = e.target.value}}
                    >
                    </StyledTextField>
                </Box>
            </Box>

            <Box sx={{
                height:'15%',
                width:'100%',
                display:'flex',
                justifyContent:'center',
                alignItems: 'center'
            }}>
                <Button onClick={()=>{
                    setName(name)
                    navigate('/lobby')
                }}
                sx={{backgroundColor:'white', color:'blue'}}
                >
                    <Typography fontFamily={'"Itim", cursive'} color={'darkblue'} fontSize={'20px'}>Start</Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default CharacterSelection