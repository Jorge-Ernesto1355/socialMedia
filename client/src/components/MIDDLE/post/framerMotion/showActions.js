export function variantsAction(object) {
  if (object) {
    return {
      visible: {
        ...object,
      },
      hidden: {
        scale: 0,
      },
    };
  } else {
    return {
      visible: {
        scale: 1,
        y: -50,
      },
      hidden: {
        scale: 0,
      },
    };
  }
}
