import React, { Suspense, lazy, useState } from 'react'
import editar from '../../icons/editar.png'
import Loader from '../../../../../../utilities/Loader'
import EditPost from './EditPost'
const ConfirmationModal = lazy(() => import('../../../../../modal/ConfirmationModal'))

const EditPostConfirmationModal = ({ postId }) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <li className="ellipsiPost-item" onClick={() => {
        setIsOpen(true)
      }}>
        <div className='editPost-content'>
        <img src={editar} alt="editar post" />
        <h6awaw className="ellipsiPost-text">Editar post</h6awaw>
        </div>
        <p className='ellipsiPost-description'>Only description can change</p>

      </li>
      {isOpen && (
        <Suspense fallback={<Loader />}>
          <ConfirmationModal isOpen={isOpen} handleClose={setIsOpen}>
            <EditPost postId={postId} handleClose={setIsOpen} />
          </ConfirmationModal>
        </Suspense>
      )}

    </>
  )
}

export default EditPostConfirmationModal