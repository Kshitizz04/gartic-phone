import { Box } from '@mui/material'
import React, { useState } from 'react'
import ReactPainter from 'react-painter'

const Canvas = () => {
  const [image, setImage] = useState("")

  return (
    <Box>
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
  )
}

export default Canvas
// const [image, setImage] = useState("")

{/* <Box sx={{border: '2px black solid',width:'300px'}}>
            <ReactPainter
            onSave={blob=>console.log(blob)}
            render={({ triggerSave, canvas , imageDownloadUrl}) => (
                <div>
                <button onClick={triggerSave} >Save Canvas</button>
                <button onClick={()=>{setImage(imageDownloadUrl)}}>Submit</button>
                <div>{canvas}</div>
                </div>
            )}
            <img src={image}/>
            />
        </Box> */}