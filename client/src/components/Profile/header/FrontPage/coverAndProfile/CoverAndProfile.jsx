





import { Avatar, Skeleton } from 'antd'
import React from 'react'
import './coverProfile.css'
import { PictureOutlined, UserOutlined } from '@ant-design/icons'
import BlurImageLoader from '../../../../../utilities/BlurImageLoader'

const CoverAndProfile = ({imageUrl, user, isLoadingUser, style, sizeAvatar}) => {

  return (
    <div className='cover-profile-container' style={style}>
       {isLoadingUser ? (
                          <Skeleton.Node active={true} style={{width: '550px', height: "250px" }}>
                              <PictureOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
                          </Skeleton.Node>
                        ):(
                          <>

                            <BlurImageLoader bgColor='#fff' divStyleClass={'img-container'} notImage={!user?.coverPicture?.url && !imageUrl} imageStyleClass={`cover-profile-img`} image={imageUrl ? imageUrl : user?.coverPicture?.url } alt={"cover picture"} preview={imageUrl ? imageUrl : user?.coverPicture?.previewUrl }  />
                              
                          </>
                        ) }
                  
              
        {isLoadingUser ?  <Skeleton.Avatar active={true} className='cover-profile-avatar' size={130} shape={"circle"}  /> : <Avatar className='cover-profile-avatar' icon={<UserOutlined />}  size={sizeAvatar} src={user?.imageProfile?.url}/>  }
      </div>
  )
}

export default CoverAndProfile