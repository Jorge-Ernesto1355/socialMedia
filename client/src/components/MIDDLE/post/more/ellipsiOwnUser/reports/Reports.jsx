import React from 'react'
import ReportIcon from '../../icons/ReportIcon'
import { Popover } from 'antd'

const Reports = ({reportsLength}) => {
    
    const ReportContent = (
            <>
                <p>
                    the users are not available
                </p>
                <p> realize to 30 reports the post will delete</p>
            </>
    )


  return (
    <Popover trigger={'click'} content={ReportContent}>
    <li className="ellipsiPost-item">
            <div className='editPost-content'>
               <ReportIcon></ReportIcon>
                <div className='ellipsi-item-head'>
                <h4 className="ellipsiPost-text">Reports</h4>
                <span className='favorite-length'>{reportsLength}</span>
                </div>
            </div>
    </li>
    </Popover>
  )
}

export default Reports