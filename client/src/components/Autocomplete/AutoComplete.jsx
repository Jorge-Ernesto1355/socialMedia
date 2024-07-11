import "./autoComplete.css";
import React, { useEffect, useMemo, useRef } from "react";
import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";
import { getActiveToken, isValidUsername, replaceAt } from "./utils";
import { useAutocomplete } from "../../hooks/useAutocomplete";
import algoliasearch from "algoliasearch";

import AccountItem from "./Item/Item";
import Loader from "../../utilities/Loader";

const searchClient = algoliasearch(
  "PZG4Z8HDRA",
  "f4018b1d9b79e8cedc28fae6fb2bb44a",
);
const INDEX_NAME = "users";

function getCaretCoordinates(element) {
  // Create a div off-screen with the same styles as the element
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = '-9999px';
  div.style.left = '-9999px';
  div.style.width = element.clientWidth + 'px';
  div.style.height = element.clientHeight + 'px';
  div.style.fontSize = window.getComputedStyle(element).fontSize;
  div.style.fontFamily = window.getComputedStyle(element).fontFamily;
  div.style.fontWeight = window.getComputedStyle(element).fontWeight;
  div.style.letterSpacing = window.getComputedStyle(element).letterSpacing;
  div.style.whiteSpace = 'pre-wrap'; // To ensure the same wrapping as the element

  // Copy the text up to the caret position into the div
  const textBeforeCaret = element.value.substring(0, element.selectionStart);
  const span = document.createElement('span');
  span.textContent = textBeforeCaret;
  div.appendChild(span);

  // Insert a span at the caret position
  const caretSpan = document.createElement('span');
  caretSpan.textContent = '|'; // Using '|' as a visual indicator for the caret
  div.appendChild(caretSpan);

  // Copy the text after the caret position into the div
  const textAfterCaret = element.value.substring(element.selectionStart);
  const afterCaretSpan = document.createElement('span');
  afterCaretSpan.textContent = textAfterCaret;
  div.appendChild(afterCaretSpan);

  // Append the div to the document body
  document.body.appendChild(div);

  // Get the caret span's position relative to the div
  const caretRect = caretSpan.getBoundingClientRect();
  const divRect = div.getBoundingClientRect();
  const topOffset = caretRect.top - divRect.top;
  const leftOffset = caretRect.left - divRect.left;
  const height = caretRect.height;

  // Remove the div from the document
  document.body.removeChild(div);

  // Return the caret's coordinates and height
  return {
    top: topOffset,
    left: leftOffset,
    height: height,
  };
}

// Example usage



// Example usage



const AutoComplete = (props, ref) => {
  const inputRef = ref || useRef();
  const { autocomplete, state } = useAutocomplete({
    ...props,
    defaultActiveItemId: 0,
    insights: true,
    getSources({ query }) {
      const cursorPosition = inputRef?.current?.selectionEnd || 0;
      const { word, range } = getActiveToken(query, cursorPosition);

      if (word && isValidUsername(word)) {
        return [
          {
            sourceId: "accounts",
            onSelect({ item, setQuery }) {
              const [index] = range;
              const replacement = `@${item.username}`;
              const newQuery = replaceAt(query, replacement, index, word.length);

              props.set && props.set(newQuery);
              setQuery(newQuery);

              if (inputRef.current) {
                inputRef.current.selectionEnd = index + replacement.length;
              }
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: INDEX_NAME,
                    query: word.slice(1),
                    params: {
                      hitsPerPage: 8,
                    },
                  },
                ],
              });
            },
          },
        ];
      }
      return [];
    },
  });

  useEffect(() => {
    if (typeof props.initialText !== "undefined") {
      autocomplete.setQuery(`@${props.initialText}`);
      props.set && props.set(inputRef.current.value + `@${props.initialText}`);
    }
  }, [props.initialText]);



  const coordinates = useMemo(()=>{
    if (inputRef.current) {
      
      const coordinates = getCaretCoordinates(inputRef.current);
      return coordinates
 
    }
  }, [state.query]) ?? {top: 0, height: 0,left: 0}



  function onInputNavigate() {
    props.handleToComponent &&
      props.handleToComponent(inputRef?.current?.value ?? "");
    const cursorPosition = inputRef.current?.selectionEnd || 0;
    const { word } = getActiveToken(state.query, cursorPosition) || "";
    const shouldOpen = isValidUsername(word);
    autocomplete.setIsOpen(shouldOpen);
    autocomplete.refresh();
  }

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef?.current,
    autoFocus: true,
    maxLength: 300,
  });

  return (
    <div {...autocomplete.getRootProps({})} className="panel">
      <div>
        <form
          {...autocomplete.getFormProps({
            inputElement: inputRef?.current,
          })}
          className="form-autocomplete"
        >
          <textarea
            ref={inputRef}
            {...inputProps}
            onKeyUp={(event) => {
              if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
                onInputNavigate();
              }
              props.set && props.set(event.target?.value);
            }}
            onClick={(event) => {
              inputProps.onClick(event);
              onInputNavigate();
            }}
            value={props.stateValue ? props.stateValue() : null}
            required
            placeholder={props.placeholder}
            maxLength="300"
            rows={props.rows}
            cols={props.cols}
            className={`limited-textarea ${props.larger && props.larger}`}
          ></textarea>
        </form>
        <div
          {...autocomplete.getPanelProps({})}
          className="autocomplete-panel"
          style={{top: `${coordinates?.top + coordinates.height}px`, left: coordinates.left}}
        >
          {state.status === "stalled" && !state.isOpen && <Loader />}

          {state.isOpen &&
            state.collections.map(({ source, items }) => (
              <div
                key={`source-${source.sourceId}`}
                className={[
                  "autocomplete-source",
                  state.status === "stalled" && "autocomplete-source-stalled",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {!!items && (
                  <ul
                    {...autocomplete.getListProps()}
                    className="autocomplete-items"
                  >
                    {items?.map((item) => {
                      const itemProps = autocomplete.getItemProps({
                        item,
                        source,
                      });

                      return (
                        <li key={item.objectID} {...itemProps}>
                          <div
                            className={[
                              "autocomplete-item",
                              itemProps["aria-selected"] &&
                              "autocomplete-item-selected",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            <AccountItem hit={item} />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(AutoComplete);
