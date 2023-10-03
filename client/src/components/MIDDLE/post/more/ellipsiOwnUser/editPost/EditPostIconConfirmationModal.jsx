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
        <img src={editar} alt="editar post" />
        <h4 className="ellipsiPost-text">Editar post</h4>

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