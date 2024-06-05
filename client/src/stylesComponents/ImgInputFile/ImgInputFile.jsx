import React from 'react'
import './ImgInputFile.css'
import gallery from '../../components/MIDDLE/crearPost/icons/gallery.png'
const ImgInputFile = ({icon}, inputFile) => {
    return (
        <div className='imgInputFile-container'>
            {icon}

            <input
                type="file"
                ref={inputFile}
                id="fileInput"
                className="ImgInputFile"
                accept="image/png, image/jpeg, image/jpg, /image.jfif"
            />
        </div>

    )
}

export default React.forwardRef(ImgInputFile)