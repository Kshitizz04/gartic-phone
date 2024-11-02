import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import Players from '../components/Players';
import {useRoom } from '../app-state/store';

const MainBox = styled(Box)({
  height:'95%', 
  width:'60%', 
  backgroundColor:'rgba(38, 28, 92, .5)',
  borderRadius:'10px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  position:'relative',
  padding: '10px',
})

const PromptBox = styled(Box)({
  width:'90%',
  backgroundColor:'rgba(255, 255, 255, .7)',
  border: '2px solid #301a6b',
  borderRadius: '100px',
  marginBottom: '5px',
  padding: '10px',
  display: 'flex',
})

const DrawingBox = styled(Box)({
  width:'90%',
  backgroundColor:'rgba(255, 255, 255, .7)',
  border: '2px solid #301a6b',
  borderRadius: '10px',
  marginBottom: '5px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const ButtonContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  position: 'sticky',
  padding: '10px 0',
});

const Diaries = () => {
  const players = useRoom((state)=>{return state.players})
  const diaries = useLocation().state.data;
  const [currentIndex,setCurrentIndex] = useState(0);
  let prompt = true;

  let currentDiary = Object.entries(diaries[currentIndex])
  currentDiary = currentDiary.slice(currentIndex).concat(currentDiary.slice(0, currentIndex));
  
  const NextButton = ()=>{
    return (
      <IconButton onClick={()=>{
        if(currentIndex<players.length){
          setCurrentIndex(state => state+1)
        }
      }}
      
      sx={{display:`${currentIndex<players.length-1 ? 'block' : 'none'}`}}
      >
        <Button sx={{backgroundColor:'white', color:'blue'}}>
            <Typography fontFamily={'"Itim", cursive'} color={'darkblue'} fontSize={'20px'}>Next</Typography>
        </Button>
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

        sx={{display:`${currentIndex>0 ? 'block' : 'none'}`}}
      >
        <Button sx={{backgroundColor:'white', color:'blue'}}>
          <Typography fontFamily={'"Itim", cursive'} color={'darkblue'} fontSize={'20px'}>Prev</Typography>
        </Button>
      </IconButton>
    )
  }

  return (
    <Box sx={{width:'100%',height:'75%',display:'flex', justifyContent:'space-around',alignItems:'center'}}>
      <Players/>
      <MainBox>
        <Typography fontSize={'40px'} color={'#5cffb6'} sx={{textShadow:'-1px -1px 0px black,1px -1px 0px black,-1px 1px 0px black,1px 1px 0px black', fontFamily:'"Itim", cursive',position:'sticky', top:'0'}}>{players[currentIndex].name}'s Diary</Typography>

        <Box sx={{
          overflowY:'auto',
        }}>
          {currentDiary.map(([key,value])=>{

            if(prompt){
              prompt = !prompt;
              return(
                <PromptBox>
                  <Typography fontSize={'20px'} color={'#301a6b'} sx={{fontFamily:'"Itim", cursive'}}>{players[key].name}: {value}</Typography>
                </PromptBox>
              )
            }
            else{
              prompt=!prompt;
              return(
                <DrawingBox>
                  <Typography fontSize={'20px'} color={'#301a6b'} sx={{fontFamily:'"Itim", cursive'}}>{players[key].name}</Typography>
                  <img src={value} alt=''/>
                </DrawingBox>
                
              )
            }     
          })}
        </Box>

        <ButtonContainer>
          <PrevButton/>
          <NextButton/>
        </ButtonContainer>
      </MainBox>
      
    </Box>
  )
}

export default Diaries