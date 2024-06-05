import React from 'react'
import montaña from "../../../../assets/img.jpg";
import './frontPage.css'
import ModalEditFrontPage from './modalEditFronPage/ModalEditFrontPage';
import { useQuery } from 'react-query';
import UserService from '../../../../services/UserService';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
const FrontPage = ({userId}) => {

  const privateRequest = useUserRequest()
  const { data: user, isLoading: isLoadingUser } = useQuery(["user", userId], () => UserService.getUser({ privateRequest, userId , options: ["coverPicture"]}));
  return (
    <div className='profile-card-frontPage'>
        <img className='profile-card-fronPage-img' src={montaña} alt="" />
        <ModalEditFrontPage userId={userId} user={user} isLoadingUser={isLoadingUser}/>
    </div>
  )
}

export default FrontPage