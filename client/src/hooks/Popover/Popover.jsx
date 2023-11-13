import React, { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId
} from "@floating-ui/react";

import "./Popover.css";



function Popover({trigger, children}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift()
    ],
    whileElementsMounted: autoUpdate
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role
  ]);
  
  const headingId = useId();
  
  
  
    if(!React.isValidElement(children)) return null

  return (
    <>
     
      {React.cloneElement(trigger, { ref: refs.setReference, ...getReferenceProps() })}
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
           {children}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

export default Popover

