import React, { Suspense, lazy, useState } from 'react'
import './TypeComment.css'
import Arrowdown from '../../../../../assets/caret.png'
import Loader from '../../../../../utilities/Loader'

const TypeCommentEllipsi = lazy(() => import('./TypeCommentEllipsi'))

const TypeComments = ({ changeType, }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='typeComments-container'>
            <div className='typeComments-selector' onClick={() => setIsOpen((prev) => !prev)}>
                <h5>Comments</h5>
                <img className='typeComments-arrow' src={Arrowdown} alt="" />
            </div>

            <Suspense fallback={<Loader box={'box'} />}>
                <TypeCommentEllipsi isOpen={isOpen} changeType={changeType} hideEllipsi={setIsOpen} />
            </Suspense>
        </div>


    )
}

export default TypeComments