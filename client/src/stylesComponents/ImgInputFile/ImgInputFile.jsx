import React from 'react'
import './ImgInputFile.css'
import gallery from '../../components/MIDDLE/crearPost/icons/gallery.png'
const ImgInputFile = ({img}, inputFile) => {
    return (
        <div className='imgInputFile-container'>
            <img className="imgInputFile-img" src={img ? img : gallery}  />

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