import { Tabs, theme } from 'antd';
import React from 'react'
import Feed from '../../MIDDLE/feed/Feed';
import StickyBox from 'react-sticky-box';
import profileProvider from '../ProfileProvider';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {

    const {setTab} = profileProvider()

    const isTiny = useMediaQuery({maxWidth: 800})

    const items = [
        {
          key: '1',
          label: 'Publicaciones',
          
        },
        {
          key: '2',
          label: 'Favoritos',
         
        },
        ...(isTiny ? [{ key: '3', label: 'Information' }] : []),
        ...(isTiny ? [{ key: '4', label: 'Photos' }] : []),
      ];


      
    
  return (
    <Tabs defaultActiveKey="1"   items={items} onChange={(e)=> setTab(parseInt(e))} />
  )
}

export default Footer