import { useMemo, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";

export function useAutocomplete(props) {
  const [state, setState] = useState(() => ({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: "",
    activeItem: null,
    status: "idle",
  }));

  const autocomplete = useMemo(() => {
    return createAutocomplete({
      ...props,
      onStateChange(params) {
        props.onStateChange?.(params);
        setState(params.state);
      },
    });
  }, []);

  return { autocomplete, state };
}
