import React from 'react'
import Image from '../../../../utilities/Image'
import './UsersOnline.css'
import AliceCarousel from 'react-alice-carousel';
import rem from '../../../../assets/rem.jpg'
import 'react-alice-carousel/lib/alice-carousel.css';
const UsersOnline = () => {

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5.5 },
    };
    const items = [1, 2, 3, 4,5 ,6, 7, 8, 9].map(({item, i})=>(
        <li key={i} className='usersOnline-item'>
            <div className='profile-photo'>
                <Image src={rem}/>
                
            </div>
            
        </li>
    ))
  return (
    <div className='usersOnline-container'>
        <h5 className='usersOnline-title'>Contactos en linea <span className='usersOnline-length'>(5)</span></h5>
        <AliceCarousel
    mouseTracking
    disableDotsControls
    disableButtonsControls
    items={items}
    responsive={responsive}
    controlsStrategy="alternate"
/>
    </div>

  )
}

export default UsersOnline