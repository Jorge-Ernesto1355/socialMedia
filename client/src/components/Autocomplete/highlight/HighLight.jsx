import { parseAlgoliaHitHighlight } from "@algolia/autocomplete-preset-algolia";
import { Fragment } from "react";
function Highlight({ hit, attribute }) {
  const si = parseAlgoliaHitHighlight({
    hit,
    attribute,
  });


  return <></>;
}

export default Highlight;
