import { useAutocomplete } from '../hooks/useAutocomplete';
import algoliasearch from 'algoliasearch';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { useCallback, useRef } from 'react';
import { useCallbackRequest } from '../hooks/useCallbackRequest/useCallbackRequest';

const searchClient = algoliasearch(
    "PZG4Z8HDRA",
    "f4018b1d9b79e8cedc28fae6fb2bb44a",
  );
// eslint-disable-next-line react/display-name
const WithSearch = (Component, options) =>  (props) => {

    const inputRef = useRef()

    const {data, isLoading: isLoadingInitialState, isError: isErrorInitialState} = useCallbackRequest({request: options?.initialStateRequest, name: options?.INDEX_NAME})

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
        maxLength: 20,
        
      });



    return (
        <Component {...props} autocomplete={autocomplete} ref={inputRef} state={state} inputProps={inputProps} initialState={options?.initialState}>
        {props.children}
        </Component>
    )
}

export default WithSearch