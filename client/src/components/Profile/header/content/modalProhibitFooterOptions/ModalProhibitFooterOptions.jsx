import { LoadingOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Flex, Popover, Typography, message } from 'antd'
import React from 'react'
import { useMutation } from 'react-query';
import UserService from '../../../../../services/UserService';
import AuthProvider from '../../../../../zustand/AuthProvider';
import SpinnerLoader from '../../../../../stylesComponents/spinnerLoader/SpinnerLoader';
import useUserRequest from '../../../../../hooks/auth/useUserRequest';
const { Text, Title} = Typography;
const ModalProhibitFooterOptions = () => {



    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    
    const {mutate: forbiddenFavorites, isLoading: isLoadingFavorites} = useMutation({
        mutationFn: UserService.forbiddenFavoritesPosts, 
        mutationKey: [userId, "forbiddenFavoritesPosts"], 
        onSuccess: (data)=>  message.success(data?.data?.message ?? "favorites posts have been succefulyy" ),
        onError:()=> message.error("Upps... something went wrong")
    })

    const {mutate: forbiddenReactions, isLoading: isLoadingReactions} = useMutation({
        mutationFn: UserService.forbiddenReactionsPosts, 
        mutationKey: [userId, "forbidderReactionsPosts"], 
        onSuccess: (data)=>  message.success(data?.data?.message ?? "reactions posts have been succefulyy" ),
        onError:()=> message.error("Upps... something went wrong")
    })

    

    const content = (
        <Flex vertical>
            <li style={{width: '300px', cursor: "pointer"}} onClick={()=> forbiddenFavorites({id: userId, privateRequest})}>
                <Title level={5} style={{marginBottom:"0"}}>Prohibit favorites</Title>
                <Text type='secondary' >prohibit favorites to users cant see what posts has been saved</Text>
            </li>
            <li style={{width: '300px', cursor: "pointer"}} onClick={()=> forbiddenReactions({id: userId, privateRequest})}>
                <Title level={5} style={{marginBottom:"0"}}>Prohibit reactions</Title>
                <Text type='secondary' >prohibit reactions to post that you have reacted to</Text>
            </li>
        </Flex>
    )
  return (
        <Popover content={content} trigger={"click"}>
            <Button isLoading={isLoadingFavorites || isLoadingReactions} disabled={isLoadingFavorites || isLoadingReactions}>
               <MoreOutlined />
            </Button>
        </Popover>
  )
}

export default ModalProhibitFooterOptions