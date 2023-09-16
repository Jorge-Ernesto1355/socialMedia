const ConcatUserWithActions = (actions, usersOfActions) => {
  if (actions === undefined || usersOfActions === undefined) {
    return {
      gusta: [{ label: '', userId: null }],
      encanta: [{ label: '', userId: null }],
      asombra: [{ label: '', userId: null }],
      entristece: [{ label: '', userId: null }],
      divierte: [{ label: '', userId: null }]
    };
  }

  let gusta = [];
  let encanta = [];
  let asombra = [];
  let entristece = [];
  let divierte = [];
  let allActions = [];

  if (actions?.gusta && usersOfActions?.gustaActions) {
    for (let i = 0; i < actions.gusta.length; i++) {
      if (actions.gusta[i].userId === usersOfActions.gustaActions[i]._id) {
        let user = usersOfActions.gustaActions[i];
        gusta = [{ ...actions.gusta[i], user }];
      }
    }
  }

  if (actions?.encanta && usersOfActions?.encantaActions) {
    for (let i = 0; i < actions.encanta.length; i++) {
      if (actions.encanta[i].userId === usersOfActions.encantaActions[i]._id) {
        let user = usersOfActions.encantaActions[i];
        encanta = [{ ...actions.encanta[i], user }];
      }
    }
  }

  if (actions?.divierte && usersOfActions?.divierteActions) {
    for (let i = 0; i < actions.divierte.length; i++) {
      if (
        actions.divierte[i].userId === usersOfActions.divierteActions[i]._id
      ) {
        let user = usersOfActions.divierteActions[i];
        divierte = [{ ...actions.divierte[i], user }];
      }
    }
  }

  if (actions?.asombra && usersOfActions?.asombraActions) {
    for (let i = 0; i < actions.asombra.length; i++) {
      if (actions.asombra[i].userId === usersOfActions.asombraActions[i]._id) {
        let user = usersOfActions.asombraActions[i];
        asombra = [{ ...actions.asombra[i], user }];
      }
    }
  }

  if (actions.entristece && usersOfActions?.entristeceActions) {
    for (let i = 0; i < actions.entristece.length; i++) {
      if (
        actions.entristece[i].userId === usersOfActions.entristeceActions[i]._id
      ) {
        let user = usersOfActions.entristeceActions[i];
        entristece = [{ ...actions.entristece[i], user }];
      }
    }
  }

  allActions = gusta
    .concat(encanta)
    .concat(asombra)
    .concat(divierte)
    .concat(entristece);
  return { gusta, encanta, divierte, asombra, entristece, allActions };
};

export default ConcatUserWithActions;
