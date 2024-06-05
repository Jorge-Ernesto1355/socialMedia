import React, { useCallback, useState } from 'react'
import './vote.css'


import useMutationRequest from '../../../../hooks/useMutationRequest';
import voteService from './service/vote.service';
import LoaderVote from './LoaderVote';
import AuthProvider from '../../../../zustand/AuthProvider';
import { Button } from 'antd';



const porcentageVoto = ({ totalVotes, votes }) => {
    if (totalVotes <= 0 || votes <= 0) return null
    const porcentage = (votes / totalVotes) * 100;
    return porcentage.toFixed(2)
}

const Vote = ({ vote, postId, totalVotes }) => {


   
   const {userId} = AuthProvider()
    const [porcentaje, setPorcentaje] = useState(0)

    const { mutate, isLoading} = useMutationRequest(voteService, { name: 'votes' })



    const HandleMutate = useCallback(() => {
        mutate({
            postId,
            userId,
            voteId: vote?._id
        }, {
            onSuccess: () => {
                const porcentaje = porcentageVoto({ totalVotes, votes: vote?.counter?.length })
                if (!porcentaje) return
                setPorcentaje(porcentaje)
            },
        })

    }, [])



    return (
        <div className='vote-container' onClick={() => HandleMutate()} >
            {isLoading && <LoaderVote />}
            {!isLoading && (
                <>
                    <Button  block={true} className={`vote-body ${porcentaje > 0 && 'expanded'}`}>
                        <span>{vote?.text}</span>
                       {isLoading ? <LoaderVote />  : <p >{vote?.counter?.length}</p>}
                    </Button>
                </>
            )}

        </div>
    )
}

export default Vote