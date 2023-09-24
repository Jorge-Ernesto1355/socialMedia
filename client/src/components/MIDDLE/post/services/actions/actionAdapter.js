const actionAdapter = (actions) => {
  if (actions === undefined) {
    return {
      gusta: [{ label: "" }],
      encanta: [{ label: "" }],
      asombra: [{ label: "" }],
      entristece: [{ label: "" }],
      divierte: [{ label: "" }],
      actionsActivated: [{ label: "" }],
    };
  }
  let gusta = [];
  let encanta = [];
  let asombra = [];
  let entristece = [];
  let divierte = [];

  let actionsActivated = [];

  actions.forEach((action) => {
    if (action.label === "gusta") gusta = [...gusta, action];
    if (action.label === "encanta") encanta = [...encanta, action];
    if (action.label === "asombra") asombra = [...asombra, action];
    if (action.label === "entristece") entristece = [...entristece, action];
    if (action.label === "divierte") divierte = [...divierte, action];
  });

  if (gusta.length > 0) {
    actionsActivated = [...actionsActivated, { label: "gusta" }];
  }
  if (encanta.length > 0) {
    actionsActivated = [...actionsActivated, { label: "encanta" }];
  }
  if (asombra.length > 0) {
    actionsActivated = [...actionsActivated, { label: "asombra" }];
  }
  if (entristece.length > 0) {
    actionsActivated = [...actionsActivated, { label: "entristece" }];
  }
  if (divierte.length > 0) {
    actionsActivated = [...actionsActivated, { label: "divierte" }];
  }

  return {
    gusta,
    encanta,
    asombra,
    entristece,
    divierte,
    allActions: actions,
    actionsActivated,
  };
};

export default actionAdapter;
