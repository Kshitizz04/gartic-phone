import { Box, IconButton } from '@mui/material'
import React, { useState } from 'react'
import ReactPainter from 'react-painter'
import { socket } from '../socket'
import { useGame, useRoom, useSelf } from '../app-state/store'

const Canvas = ({id,roomCode}) => {

  const setIsDraw = useGame((state)=>{return state.setIsDraw})
  // const [image, setImage] = useState("")

  return (
    <Box sx={{width: '500px', height: '500px', border: 'solid black 2px'}}>
        <ReactPainter
            onSave={blob=>console.log(blob)}
            render={({ triggerSave, canvas , imageDownloadUrl}) => (
                <Box>
                  <Box>{canvas}</Box>
                  <button onClick={triggerSave}>Save</button>
                  <IconButton onClick={
                    ()=>{
                    socket.emit('sendCanvas',{id:id, room: roomCode, url: imageDownloadUrl})
                    setIsDraw()
                    }
                    // ()=>{setImage(imageDownloadUrl); console.log('imagedownloadurl: ', imageDownloadUrl)}
                  }>
                    Submit
                  </IconButton>
                </Box>
            )}
            />
            {/* <img src={image}/>
            {console.log('image: ', image)} */}
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