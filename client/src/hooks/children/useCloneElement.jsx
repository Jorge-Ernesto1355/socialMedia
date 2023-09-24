import React from "react";

export function useCloneElement(element, additionalProps) {
  return React.cloneElement(element, additionalProps);
}
