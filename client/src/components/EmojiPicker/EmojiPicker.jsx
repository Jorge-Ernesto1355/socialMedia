import "./EmojiPicker.css";
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { useCallback, useState } from "react";

export default function EmojiPickerComponent() {
    
    const [emojis, setEmojis] = useState([])
 
   const onClickEmojis = useCallback((event)=>{
    const {names, unified} = event
    setEmojis((prev)=>{
       return {
         ...prev,
         [names[0]]:unified
       }
    })
   }, [emojis])

  return (
    < div className="App">
      <EmojiPicker onEmojiClick={onClickEmojis} />
    </div>
  );
}
