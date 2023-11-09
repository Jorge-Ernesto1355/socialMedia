import React, { useState } from 'react'


import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    FloatingFocusManager
  } from '@floating-ui/react';

const Popover = ({trigger, firstConditional, secondContitional, conditional}) => {

    const [isOpen, setIsOpen] = useState(false);

    if(!React.isValidElement(trigger) || !React.isValidElement(firstConditional )|| !React.isValidElement(secondContitional )) return null

    const {refs, floatingStyles, context} = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      middleware: [offset(10), flip(), shift()],
      whileElementsMounted: autoUpdate,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context, {
        enabled: false,
      });
    const role = useRole(context);

    const {getReferenceProps, getFloatingProps} = useInteractions([
        click,
        dismiss,
        role,
      ]);


  return (
    <div>

        <button  ref={refs.setReference} {...getReferenceProps()} style={{background:'transparent'}}> {trigger}</button>
        {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {
                conditional && firstConditional
            }
            {!conditional && secondContitional}
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
}

export default Popover