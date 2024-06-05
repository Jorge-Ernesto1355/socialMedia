import React from 'react'
import FavoritesIcon from '../../icons/favoriteIcon/FavoritesIcon'
import { Popover } from 'antd'
import FavoriteUser from './FavoriteUser'

const Favorites = ({postId, favoriteLength}) => {
  return (

    <Popover trigger={'click'} content={<FavoriteUser postId={postId}/>}>
    <li className="ellipsiPost-item" >
            <div className='editPost-content'>
            <FavoritesIcon></FavoritesIcon>
            <div className='ellipsi-item-head'>
                <h4 className="ellipsiPost-text">Favorites</h4>
                <span className='favorite-length'>{favoriteLength}</span>
                </div>
            </div>
    </li>
    </Popover>
  )
}

export default Favorites