import React from 'react'
import './InputEditPost.css'
const InputEditPost = ({ _ }, ref) => {
    return (
        <form className="input-wrapper">
            <input ref={ref} type="text" placeholder="Type here..." name="text" className="input-edit-post" />
        </form>
    )
}

export default React.forwardRef(InputEditPost)