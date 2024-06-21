import { Card } from 'antd'
import React, { useState } from 'react'
import { BackgroundsGradients } from './utils/backgroundsGradient'
import "./backgroundsStories.css"
const BackroundsStories = ({handleBackground}) => {

    const [clickedId, setClickedId] = useState(null);

    const handleClick = ({id, style}) => {
      setClickedId(id);
      handleBackground(style)
    };
    

  return (
    <Card style={{ width: '100%', height: "100%" }}>
    <div className="backgrounds-container">
      {BackgroundsGradients.map((background) => (
        <div key={background.id} className={`backgroundStory-container ${clickedId === background.id && "clicked"}`}  onClick={()=> handleClick({id: background.id, style: background.style.backgroundImage }) } style={background.style}/>
      ))}
    </div>
  </Card>
  )
}

export default BackroundsStories