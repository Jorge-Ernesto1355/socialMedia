import React, { useCallback, useState } from 'react'
import './vote.css'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';
import useMutationRequest from '../../../../hooks/useMutationRequest';
import voteService from './service/vote.service';
import LoaderVote from './LoaderVote';



const porcentageVoto = ({ totalVotes, votes }) => {
    if (totalVotes <= 0 || votes <= 0) return null
    const porcentage = (votes / totalVotes) * 100;
    return porcentage.toFixed(2)
}

const Vote = ({ vote, postId, totalVotes }) => {


    const { _id: currentUser } = useSelector(
        (state) => state.user.currentUser.user,
    );

    const [porcentaje, setPorcentaje] = useState(0)

    const { mutate, isLoading, isError } = useMutationRequest(voteService, { name: 'votes' })



    const HandleMutate = useCallback(() => {
        mutate({
            postId,
            userId: currentUser,
            voteId: vote?._id
        }, {
            onSuccess: () => {
                const porcentaje = porcentageVoto({ totalVotes, votes: vote?.counter?.length })
                if (!porcentaje) return
                setPorcentaje(porcentaje)
            },
            // eslint-disable-next-line n/handle-callback-err
            onError: (err) => {

                setPorcentaje(0)
            }
        })

    }, [])



    return (
        <div className='vote-container' onClick={() => HandleMutate()} >
            {isLoading && <LoaderVote />}
            {!isLoading && (
                <>
                    {porcentaje > 0 && <motion.div className='expanded-var-vote' initial={{ width: '0%' }} animate={{ width: `${porcentaje}%` }} transition={{ duration: .5 }}>
                        <span className='text-expand-var'>{vote?.text}</span>
                        <p className='counter-expand-var'>{vote?.counter?.length}</p>
                    </motion.div>}
                    <div className={`vote-body ${porcentaje > 0 && 'expanded'}`}>
                        <span>{vote?.text}</span>
                        <p >{vote?.counter?.length}</p>
                    </div>
                </>
            )}

        </div>
    )
}

export default Vote