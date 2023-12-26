import { useAutocomplete } from '../hooks/useAutocomplete';
import algoliasearch from 'algoliasearch';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { useRef } from 'react';

const searchClient = algoliasearch(
    "PZG4Z8HDRA",
    "f4018b1d9b79e8cedc28fae6fb2bb44a",
  );
// eslint-disable-next-line react/display-name
const WithSearch = (Component, options) =>  (props) => {

    const inputRef = useRef()

    const { autocomplete, state} = useAutocomplete({
        ...props,
        defaultActiveItemId: 0,
        insights: true,
        getSources({ query }) {
          if (query) {
    
            return [
              {
                sourceId: "accounts",
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: options?.INDEX_NAME,
                        query,
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

      const inputProps = autocomplete.getInputProps({
        inputElement: inputRef?.current,
        autoFocus: true,
        maxLength: 20,
      });



    return (
        <Component {...props} autocomplete={autocomplete} ref={inputRef} state={state} inputProps={inputProps}/>
    )
}

export default WithSearch