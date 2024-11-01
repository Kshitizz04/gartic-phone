import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import Players from './Players';
import { useGame, useRoom } from '../app-state/store';

const MainBox = styled(Box)({
  height: '90%',
  width: '80%',
  border: '1px solid',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
})

const Diaries = () => {
  const players = useRoom((state)=>{return state.players})
  const diaries = useLocation().state.data;
  const [currentIndex,setCurrentIndex] = useState(0);
  let prompt = true;

  let currentDiary = Object.entries(diaries[currentIndex])
  currentDiary = currentDiary.slice(currentIndex).concat(currentDiary.slice(0, currentIndex));
  console.log(players.length,currentIndex)
  
  const NextButton = ()=>{
    return (
      <IconButton onClick={()=>{
        if(currentIndex<players.length){
          setCurrentIndex(state => state+1)
        }
      }}
      >
        Next
      </IconButton>
    )
  }
  const PrevButton = ()=>{
    return (
      <IconButton onClick={()=>{
        if(currentIndex<players.length){
          setCurrentIndex(state => state-1)
        }
      }}
      >
        Prev
      </IconButton>
    )
  }

  return (
    <MainBox>
      <Players/>
      <Box sx={{height:'75%', width:'55%', border:'2px solid black'}}>
        <Typography>{players[currentIndex].name}</Typography>
        <List>
          {currentDiary.map(([key,value])=>{

            if(prompt){
              prompt = !prompt;
              return(
                <ListItem key={key}>
                  <ListItemText
                    primary={players[key].name}
                    secondary={value}
                  >
                  </ListItemText>
                </ListItem>
              )
            }
            else{
              prompt=!prompt;
              return(
                <ListItem key={key}>
                  <ListItemText primary={players[key].name}>
                  </ListItemText><br></br>
                  <img src={value} alt=''/>
                </ListItem>
              )
            }
                    
          })}
        </List>
      </Box>
      {currentIndex<players.length-1 && <NextButton/>}
      {currentIndex>0 && <PrevButton/>}
      
    </MainBox>
  )
}

export default Diaries