import React, { useState, useTransition } from 'react'
import "./CommentMobile.css"
import {  Modal } from 'antd';
import Post from '../../post/Post';
import MakeComment from './MakeComment';
import AuthProvider from '../../../../../zustand/AuthProvider';
import UseImagePreview from '../../../../../hooks/useImagePreview/useImagePreview';
import SpinnerLoader from '../../../../../stylesComponents/spinnerLoader/SpinnerLoader';
import { useMediaQuery } from 'react-responsive';

const CommentMobile = ({post = {}}) => {

    const {userId} = AuthProvider()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const showModal = () => {
        startTransition(() => {
          setIsModalOpen(true);
        });
      };
    
      const handleOk = () => {
        startTransition(() => {
          setIsModalOpen(false);
        });
      };
    
      const handleCancel = () => {
        startTransition(() => {
          setIsModalOpen(false);
        });
      };

      const showMakeComment = useMediaQuery({minWidth: 480})
    return (
      <>
        <span className="interaction-button-text" onClick={()=> showModal()}>Comment</span>
        <Modal 
         open={isModalOpen} 
         onOk={handleOk}
         onCancel={handleCancel}
         footer={null}
         closeIcon={null}
         className='commentMobile-container'
         styles={{ content: { padding: "0px", background: "none", position: "relative" }, }}
         >
            {isPending && <SpinnerLoader center/>}
            
            {!!post &&  <Post post={post} vissibleComments={true}/>}
            
            <div className='commentMobile-Container-makeComment'>
            
               {!showMakeComment &&
                <MakeComment
                    id={post._id}
                    userId={userId}
                    type="Post"
                    name="postComment"
			 />}
            </div>
        </Modal>
      </>
    );
}

export default CommentMobile