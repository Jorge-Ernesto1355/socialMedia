import { Tabs, theme } from 'antd';
import React from 'react'
import Feed from '../../MIDDLE/feed/Feed';
import StickyBox from 'react-sticky-box';
import profileProvider from '../ProfileProvider';

const Footer = () => {

    const {setTab} = profileProvider()

    const items = [
        {
          key: '1',
          label: 'Publicaciones',
          
        },
        {
          key: '2',
          label: 'Favoritos',
         
        },
      ];
    
    
  return (
    <Tabs defaultActiveKey="1"   items={items} onChange={(e)=> setTab(parseInt(e))} />
  )
}

export default Footer