import React, { useState } from 'react'
import { Modal, Divider } from 'antd';
import users from './icons/usuarios.png'
import AutoComplete from '../../../Autocomplete/AutoComplete';
import { useStore } from '../../../../hooks/useStore/useStore';
import { useCallbackRequest } from '../../../../hooks/useCallbackRequest/useCallbackRequest';
import PostServices from '../services/PostServices';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
import SingleComponent from '../../../../utilities/SingleComponent';
import Post from '../post/Post';
import WithSearch from '../../../../HOCs/WithSearch';
import UsesWtihSearch from '../../../searchFriends/UsesWtihSearch';
import ButtonSendPost from './ButtonSendPost';
import UserService from '../../../../services/UserService';


const SendToFriend = ({postId = ""}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const privateRequest = useUserRequest()
    const {data, isLoading, isError}  = useCallbackRequest({request: PostServices.get, id: postId, name:'sharedPost', privateRequest})
    const { store, set, get } = useStore()
    const UsersWithSearchHOC = WithSearch(UsesWtihSearch, {INDEX_NAME:'users', initialStateRequest: UserService.getFriends })

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

 

  return (
    <div>
         <li className='menuMessageBox-item' onClick={()=> showModal()}>
                <img className='menuMessageBox-img' src={users} alt="" />
                <p className='menuMessageBox-text'>Compartirlo con un amigo</p>
            </li>
            
        <Modal  title="Compartelo con tus amigos" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

       
        <SingleComponent isLoading={isLoading} isError={isError || data?.response?.status === 500} Loader={<>cargando post</>} ErrorMessageComponent={<>error post</>} >
            <Post simple={true} post={data?.data}/>    
        </SingleComponent>   
        <div style={{marginTop:"1rem"}}>
            
        {store && (
            <AutoComplete
              placeholder={"Comparte lo mejor para tu mejor amigo"}
              rows={3}
              cols={25}
              ref={store}
              set={set}
              stateValue={get}
              initialText={postId}
            />
        )}
        </div>
        <Divider/>

        <UsersWithSearchHOC description={'Only your friends will appear here'}>
          <ButtonSendPost text={get()} postId={postId}/>
        </UsersWithSearchHOC>
        
      </Modal>
    </div>
  )
}

export default SendToFriend