import React from 'react'
import { motion } from 'framer-motion'
import { variantsMotion } from '../../../../../utilities/variantsMotion'
import { useQueryClient } from 'react-query'

const TypeCommentEllipsi = ({ isOpen, changeType, hideEllipsi }) => {

    const queryClient = useQueryClient()

    const handleChangeTypeComments = async (name) => {
        await queryClient.invalidateQueries(name)
        changeType(name)
        hideEllipsi(false)

    }
    return (
        <motion.ul
            variants={variantsMotion}
            initial={{ scale: 0, opacity: 0 }}
            animate={`${isOpen ? "show" : "hide"}`}
            className='typeComment-ellipsi'
        >

            <li className='typeComment-element' onClick={() => handleChangeTypeComments('mostView')}>
                <h4>Most view comments</h4>
                <p className='typeComment-description'>show the comments that has more interactions first</p>
            </li>
            <li className='typeComment-element' onClick={() => handleChangeTypeComments('postComment')}>
                <h4>Most recent comments</h4>
                <p className='typeComment-description'>show the newest comments first</p>
            </li>

        </motion.ul>
    )
}

export default TypeCommentEllipsi