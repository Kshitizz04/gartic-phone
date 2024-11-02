import { Box } from "@mui/material";
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import DashBoard from "./pages/DashBoard";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Diaries from "./components/Diaries";
import styled from "styled-components";
import Logo from './Images/Logo.webp';

const MainBox = styled(Box)({
  height: '90%',
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border:'4px rgba(29, 29, 27, .15) solid',
  boxShadow: 'inset 0px 2px 0px 0px rgba(255, 255, 255, .15), 0px 3px 0px 0px rgba(255, 255, 255, .15)',
  borderRadius: '12px',
})

const TitleBox = styled(Box)({
  width:'100%',
  height:'20%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

function App() {
  
  return ( 
    <Box sx={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center', 
      height:'100vh',
      }}>
        <MainBox>
          <TitleBox>
            <img src={Logo} alt='logo'style={{objectFit:'contain', height:'100%', width:'100%'}}/>
          </TitleBox>
            <Routes>
              <Route path="/" element={<DashBoard/>}/>
              <Route path="/lobby" element={<Lobby/>}/>
              <Route path="/game" element={<Game/>}/>
              <Route path="/diaries" element={<Diaries/>}/>
            </Routes>
        </MainBox>
    </Box>
  );
}

export default App;
