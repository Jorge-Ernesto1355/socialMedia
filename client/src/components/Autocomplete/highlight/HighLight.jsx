import { parseAlgoliaHitHighlight } from "@algolia/autocomplete-preset-algolia";
import { Fragment } from "react";
function Highlight({ hit, attribute }) {
  const si = parseAlgoliaHitHighlight({
    hit,
    attribute,
  });
  console.log(hit);
  console.log(si);

  return <></>;
}

export default Highlight;
