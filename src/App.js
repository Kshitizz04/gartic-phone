import { Box } from "@mui/material";
import { useState } from "react";
import React from 'react'
import styled from "styled-components";
import { Route, Routes } from 'react-router-dom';
import DashBoard from "./pages/DashBoard";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";

function App() {
  
  return (
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', height:'100vh'}}>
      <Routes>
        <Route path="/" element={<DashBoard/>}/>
        <Route path="/lobby" element={<Lobby/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </Box>
  );
}

export default App;
