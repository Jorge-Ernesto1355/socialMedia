export const HandleStateActions = (key, actions, setActions) => {
  // Crear una copia del estado actual
  const updatedActions = { ...actions };

  // Establecer el valor del key proporcionado en true
  updatedActions[key] = true;

  // Establecer los otros valores en false
  for (const actionKey in updatedActions) {
    if (actionKey !== key) {
      updatedActions[actionKey] = false;
    }
  }
  // Actualizar el estado con el nuevo objeto de acciones
  setActions(updatedActions);
};

export const clearStateActions = (setActions) => {
  if(!setActions) return 
  setActions((prev) => !prev);
};
