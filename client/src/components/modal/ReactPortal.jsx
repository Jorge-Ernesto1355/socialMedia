import { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const createWrapperAndAppenedToBody = (wrapperId)=>{
    if(!document) return null
    const wrapperElement = document.createElement('div')
     wrapperElement.setAttribute('id', wrapperId)
     document.body.appendChild(wrapperElement)
     return wrapperElement
     
}

const ReactPortal = ({children, wrapperId, closeModal}) => {

    const [wrapperElement, setWrapperElement] = useState(null)

    useLayoutEffect(()=>{

        let element = document.getElementById(wrapperId)
        let systemCreated = false
        if(!element){
            systemCreated = true
            element = createWrapperAndAppenedToBody(wrapperId)
           
        } 
        setWrapperElement(element)
        

        return ()=>{
            if(systemCreated && element?.parentNod){
                element?.parentNode.removeChild(element)
            }
        }
    

    }, [wrapperId])

    if(!wrapperId) return null

    if(wrapperElement) {
        return createPortal(children, wrapperElement)
    }

    return null

}

export default ReactPortal