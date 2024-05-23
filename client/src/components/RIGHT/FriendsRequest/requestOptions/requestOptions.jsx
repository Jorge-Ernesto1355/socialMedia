import { message } from "antd"
import useUserRequest from "../../../../hooks/auth/useUserRequest"

const { useMutation, useQueryClient } = require("react-query")
const { default: UserService } = require("../../../../services/UserService")

export const AcceptFriendMutation = ({requestId = '', userId})=>{

    
    const queryFriendsRequest = ["requestFriends", userId]
    const queryClient = useQueryClient()
    const acceptFriend = useMutation({
        mutationKey: ["acceptFriend"],  
        mutationFn: UserService.acceptFriend, 
        onSuccess: async ()=>{
            
                await queryClient.cancelQueries(queryFriendsRequest)

                queryClient.setQueryData(queryFriendsRequest, (oldData)=>{
                    if(oldData == null ) return oldData
                    
                    const newPages = oldData.pages.map((page) => {
                        const newDocs = page.data.docs.filter(({ _id }) => _id !== requestId);
                        return { ...page, data: { ...page.data, docs: newDocs } };
                    });

                    return { ...oldData, pages: newPages };
                })
                message.success("request succefully")
            },
            onError:()=> {
                
                message.error("Something went Wrong")
            }
    })



    return acceptFriend
}