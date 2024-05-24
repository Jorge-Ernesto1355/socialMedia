import React from 'react'
import './hiddenPost.css'
import { Divider } from 'antd'
import TrashIcon from './icons/TrashIcon'
import EllipsiItem from '../../more/EllipsiNormalUser/EllipsiItem'
import { OptionsMoreObject } from '../../more/EllipsiNormalUser/EllipsiNormalUser'
import ReportIcon from '../../more/icons/ReportIcon'
import HideIcon from './icons/HideIcon'
import AuthProvider from '../../../../../zustand/AuthProvider'
import { useHiddenPost } from '../../more/optionsMoreObject/OptionsMoreObject'

const HiddenPost = ({postId, postUserId, username= ""}) => {

    const {userId} = AuthProvider()
    
    const { hidden } = useHiddenPost();

    const handleUndo = () => {
      hidden({ postId, userId, messageSucces: "undo post", hidden: false });
    };
  return (
    <div className='post-hidden-container'>
        <div className='post-hidden-header'>
            <TrashIcon></TrashIcon>
            <>
            <div >
            <h5 className='post-hidden-title'>post has been hidden</h5>
            <p className='post-hidden-description'>Al ocultar publicaciones, nos ayudas a personalizar tu feed.</p>
            </div>
            <div>
                <button onClick={handleUndo} className='button-deshacer'>Deshacer</button>
            </div>
            </>
        </div>
        <Divider/>

        <EllipsiItem
         typeItem={OptionsMoreObject.hideAll}
         postId={postId}
         userIdToHide={postUserId}
         description={<span style={{fontSize: "x-small"}}>you will not wacht any publication of  anymore</span>}
         icon={<HideIcon></HideIcon>}
         title={ <h4 className="ellipsiPost-text">Hide all  publications </h4>}/>
<Divider/>
        <EllipsiItem
         typeItem={OptionsMoreObject.report}
         postId={postId}
         userIdToHide={postUserId}
         description={<span style={{fontSize: "x-small"}}>will not notice to this</span>}
         icon={<ReportIcon/>}
         title={ <h4 className="ellipsiPost-text">Report publication</h4>}/> 
        
        


        

    </div>
  )
}

export default HiddenPost