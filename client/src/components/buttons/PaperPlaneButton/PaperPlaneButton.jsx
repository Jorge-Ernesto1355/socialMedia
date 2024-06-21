import React from 'react'
import paperPlaneBlue from '../../MIDDLE/post/comments/icons/paperPlaneBlue.png'
import paperPlaneGray from '../../MIDDLE/post/comments/icons/paperPlaneGray.png'

const PaperPlaneButton = ({input = ""}) => {
  return (
    <>
      {input?.length === 0 ? <img src={paperPlaneGray} alt="button" /> : <img src={paperPlaneBlue} alt='button '/>}
    </>
  )
}

export default PaperPlaneButton