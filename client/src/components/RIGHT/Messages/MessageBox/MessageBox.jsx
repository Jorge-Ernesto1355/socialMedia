import React, { useState } from 'react'
import './MessageBox.css'
import MessageBoxHeader from './header/MessageBoxHeader'
import MessageBoxBody from './body/MessageBoxBody'
import MessageBoxActions from './actions/MessageBoxActions'
import { motion } from 'framer-motion'
const MessageBox = () => {
    const [minimize, setMinimize] = useState(false)

    const variantsBoxMessage = {
        show: {
            translateY: 0
        },
        hidden: {
            translateY: 358
        }
    }

    return (
        <motion.div animate={`${minimize ? 'show' : 'hidden'}`} variants={variantsBoxMessage} className='MessageBox-container'>
            <MessageBoxHeader minimize={setMinimize} />
            <MessageBoxBody />
            <MessageBoxActions />
        </motion.div>
    )
}

export default MessageBox