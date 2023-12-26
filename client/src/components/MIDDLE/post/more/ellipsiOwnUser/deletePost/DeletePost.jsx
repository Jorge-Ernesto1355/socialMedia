import React, { Suspense, useCallback, useState } from 'react'
import trash from '../../icons/basura.png'
import AuthProvider from '../../../../../../zustand/AuthProvider'
import ErrorButton from '../../../comments/makeComment/styledComponentes/ErrorButton/ErrorButton'
import ConfirmationModal from '../../../../../modal/ConfirmationModal'
import ConfirmationDelete from '../../../../../deleteComponent/ConfirmationDelete'
import { DeletePost as DeletePostRequest } from '../RequestOptionsOwnUser'
import { toast } from "react-toastify";
import useUserRequest from '../../../../../../hooks/auth/useUserRequest'

const DeletePost = ({ postId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { userId: currentUser } = AuthProvider()
    const privateRequest = useUserRequest()

    const { mutateDelete, isLoadingMutationDelete, isErrorDeletePost, resetDelete } = DeletePostRequest()

    const handleDelete = () => {

        mutateDelete({
            postId,
            userId: currentUser,
            privateRequest
        }, {
            onError: () => {
                toast.error('Upss... something weng wrong')
            },
            
        })

        
    }




    return (
        <>
            <li className="ellipsiPost-item" onClick={() => setIsOpen(true)}>
            <div className='editPost-content'>
                <img src={trash} alt="icon delete post" />
                {isErrorDeletePost && <ErrorButton reset={resetDelete} />}
                <h4 className="ellipsiPost-text">Delete post</h4>
            </div>
                <p className='ellipsiPost-description'>Delete your post permanently</p>
            </li>

            {isOpen && (
                <Suspense>
                    <ConfirmationModal isOpen={isOpen} handleClose={setIsOpen} >
                        <ConfirmationDelete hideModal={setIsOpen} handleMutate={handleDelete} isLoading={isLoadingMutationDelete} />
                    </ConfirmationModal>
                </Suspense>
            )}
        </>
    )
}

export default DeletePost