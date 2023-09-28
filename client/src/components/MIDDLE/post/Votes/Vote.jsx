import React, { useCallback, useState } from 'react'
import './vote.css'
import {motion} from 'framer-motion'
import { useSelector } from 'react-redux';
import useMutationRequest from '../../../../hooks/useMutationRequest';
import voteService from './service/vote.service';
import LoaderVote from './LoaderVote';
import toast, { Toaster } from 'react-hot-toast';

const porcentageVoto = ({totalVotes, votes})=>{
    if (totalVotes <= 0 || votes <= 0) return null
    const porcentage = (votes / totalVotes) * 100;
    return porcentage.toFixed(2)
}

const Vote = ({vote, postId, totalVotes}) => {

    const { _id: currentUser } = useSelector(
		(state) => state.user.currentUser.user,
	);

    
    const [porcentaje, setPorcentaje] = useState(0)

    const {mutate, isLoading, isError} = useMutationRequest(voteService, {name:'votes'})

   
    const handleMutate = useCallback(()=>{
        
            console.log('1')
            mutate({
                postId, 
                userId:currentUser, 
                voteId:vote?._id
            }, {
                onSuccess:()=>{
                    const porcentaje = porcentageVoto({totalVotes, votes:vote?.counter?.length})
                    setPorcentaje(porcentaje)
                }, 
                // eslint-disable-next-line n/handle-callback-err
                onError:(err)=>{
                    
                    toast.error(err?.response?.data?.message)
                }
            })
        
    }, [])

    console.log(porcentaje)
    
  return (
    <div className='vote-container' onClick={()=> handleMutate()} >
        {isLoading && <LoaderVote/>}
        {!isLoading && (
            <div className='vote-body'>
           <span>{vote?.text}</span>
           <p>{vote?.counter?.length}</p>
           {porcentaje && <motion.div className='expanded-var-vote'initial={{scaleX:0, scaleY:10}} animate={{scaleX:40}} transition={{duration:.5}}/>}
            </div>
        ) }
        <Toaster/>
    </div>
  )
}

export default Vote