import React from 'react'
import './SpinnerLoader.css'
const SpinnerLoader = ({ center,  }) => {
  return (
    <div className={`spinner ${center ? 'center' : ''}`} >
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
    </div>
  )
}

export default SpinnerLoader