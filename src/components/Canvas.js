import React from 'react'

const Canvas = () => {
  return (
    <Box>
        Canvas
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