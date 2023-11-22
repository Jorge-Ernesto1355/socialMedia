import React, { useRef } from 'react'
import './search.css'

import { useAutocomplete } from '../../../hooks/useAutocomplete';
import algoliasearch from 'algoliasearch';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import Loader from '../../../utilities/Loader';
import Users from './users/Users';
import lupa from './icons/lupa.png'
import SpinnerLoader from '../../../stylesComponents/spinnerLoader/SpinnerLoader';

const searchClient = algoliasearch(
  "PZG4Z8HDRA",
  "f4018b1d9b79e8cedc28fae6fb2bb44a",
);
const INDEX_NAME = "users";
const Search = ({ props }) => {

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
                    indexName: INDEX_NAME,
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
    <div className="search-bar" {...autocomplete.getRootProps()}>
      <i>
      {state.status === "stalled" && !state.isOpen ? <SpinnerLoader/> : <img src={lupa} alt="" style={{width:'20px', height:'20px'}} />}
      
      </i>
      <form className='search-form' {...autocomplete.getFormProps({
        inputElement: inputRef?.current
      })}>
        <input
          placeholder='Busca a tus amigos'
          className='search-input'
          ref={inputRef}
          {...inputProps}
          required
          cols={30}
          rows={1}
        />
       
      </form>
      <div className="search-people-container" {...autocomplete.getPanelProps()}>
       
        {state?.isOpen && (
          <>
            {state.collections?.map(({ source, items }) => (
              <div key={`search-source-key-${source.Id}`}>

                {!!items && (
                  <Users autocomplete={autocomplete} items={items} source={source}  />
                )}
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  )
}

export default Search