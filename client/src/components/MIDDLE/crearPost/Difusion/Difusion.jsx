import React, { Suspense, lazy, useState } from 'react'
import './Difusion.css'
import ArrowDown from '../../../../assets/caret.png'
import CreatePostStore from '../../../../zustand/CreatePostStore'
const DifusionModal = lazy(() => import('./DifusionModal'))

const Difusion = () => {
  const { difusion } = CreatePostStore()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div >
      <div className='difusion-container' onClick={() => setIsOpen((prev) => !prev)}>
        <span>{difusion ? difusion : 'Only you'}</span>
        <img src={ArrowDown} alt="" />
      </div>
      {isOpen && (
        <Suspense>
          <DifusionModal isOpen={isOpen} closeModal={setIsOpen} />
        </Suspense>
      )}
    </div>
  )
}

export default Difusion