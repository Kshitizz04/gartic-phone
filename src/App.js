import { Box } from "@mui/material";
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import DashBoard from "./pages/DashBoard";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Diaries from "./components/Diaries";

function App() {
  
  return (
    <Box sx={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center', 
      height:'100vh',
      }}>
      <Routes>
        <Route path="/" element={<DashBoard/>}/>
        <Route path="/lobby" element={<Lobby/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/diaries" element={<Diaries/>}/>
      </Routes>
    </Box>
  );
}

export default App;
