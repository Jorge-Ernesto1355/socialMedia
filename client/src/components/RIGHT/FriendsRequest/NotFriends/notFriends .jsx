import React, { useState } from 'react'
import './notFriends.css'

const notFriends  = () => {
    const [isOpen, setisOpen] = useState(false)
  return (
    <div className='notFriends-container'>
        <h6> Parece que no tienes amigos, por que no presionas el boton y descubres un mundo nuevo</h6>
        <button>Buscar Amigos</button>
    </div>
  )
}

export default notFriends 