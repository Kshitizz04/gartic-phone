import { Box } from "@mui/material";
import { useState } from "react";
import ReactPainter from "react-painter";

import React from 'react'

function App() {
  const [image, setImage] = useState("")

  return (
    <>
      <Box sx={{border: '2px black solid',width:'300px'}}>
        <ReactPainter
        onSave={blob=>console.log(blob)}
          render={({ triggerSave, canvas , imageDownloadUrl}) => (
            <div>
              <button onClick={triggerSave} >Save Canvas</button>
              <button onClick={()=>{setImage(imageDownloadUrl)}}>Submit</button>
              <div>{canvas}</div>
            </div>
          )}
        />
      </Box>
      <img src={image}/>
    </>
  );
}

export default App;
