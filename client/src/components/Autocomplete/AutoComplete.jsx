import './autoComplete.css'
import React, { useEffect, useMemo, useRef, } from 'react'
import {
    getAlgoliaResults,

  } from '@algolia/autocomplete-preset-algolia';
import { getActiveToken, isValidUsername, replaceAt } from './utils';
import { useAutocomplete } from '../../hooks/useAutocomplete';
import algoliasearch from 'algoliasearch';
import getCaretCoordinates from 'textarea-caret';
import AccountItem from './Item/Item';
import Loader from '../../utilities/Loader';


const searchClient = algoliasearch(
    'PZG4Z8HDRA', 
    'f4018b1d9b79e8cedc28fae6fb2bb44a'
  
  )
  const INDEX_NAME = 'autocomplete-accounts'
  
 const AutoComplete = (props) => {

    const inputRef = useRef()

   const {autocomplete, state} = useAutocomplete({
    ...props, 
    defaultActiveItemId: 0,
    insights: true,
    getSources({query}){
        const cursorPosition = inputRef.current?.selectionEnd || 0;
        const {word, range} = getActiveToken(query, cursorPosition)

        if(word && isValidUsername(word)){
            return [
                {
                    sourceId:'accounts', 
                    onSelect({item, setQuery}){
                      
                        const [index] = range
                        const replacement = `@${item.username} `;
                        const newQuery = replaceAt(query, replacement, index, word.length)
                        
                        props.handleToComponent && props.handleToComponent(newQuery)
                        setQuery(newQuery)

                        if(inputRef.current){
                            inputRef.current.selectionEnd = index + replacement.length
                        }

                    }, 
                    getItems(){
                        return getAlgoliaResults({
                            searchClient, 
                            queries:[
                                {
                                    indexName:INDEX_NAME, 
                                    query:word.slice(1), 
                                    params:{
                                        hitsPerPage:8
                                    }
                                }
                            ]
                        })
                    }
                    
                    
                } 
                
            ]
        }
        return []
    }
   })

 
   useEffect(()=>{
      if(props.username) autocomplete.setQuery(props.username)
   }, [props.username])
  
   const { top, height } = inputRef.current
    ? getCaretCoordinates(inputRef.current, inputRef.current?.selectionEnd)
    : { top: 0, height: 0 };



   function onInputNavigate(){
    props.handleToComponent && props.handleToComponent(inputRef?.current?.value ?? '')
    const cursorPosition = inputRef.current?.selectionEnd || 0;
    const {word} = getActiveToken(state.query, cursorPosition);
    const shouldOpen = isValidUsername(word || '');
    autocomplete.setIsOpen(shouldOpen)
    autocomplete.refresh();
   }

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
    autoFocus: true,
    maxLength: 280,
  });



  return (
    <div{...autocomplete.getRootProps({})} >
      <div >

        <form
        {...autocomplete.getFormProps({
            inputElement: inputRef.current
        })} 
         >
            <textarea
            ref={inputRef}
            {...inputProps}
            onKeyUp={(event)=>{
              if(['ArrowLeft','ArrowRight'].includes(event.key)){
                onInputNavigate()
              }
            }}
            onClick={(event)=>{
              inputProps.onClick(event)
                onInputNavigate()
              }}
              required
              placeholder={props.placeholder}
              maxLength='280'
              rows={props.rows}
              cols={props.cols}
              className='limited-textarea'
              
              >
            </textarea>
        </form>
        <div 
        {...autocomplete.getPanelProps({})}
        className="autocomplete-panel"
        // style={{ top: `${top + height}px` }}
        >

             {state.status === 'stalled' && !state.isOpen (
               <Loader/>
              )}
               
              {state.isOpen && state.collections.map(
                ({source, items})=>(
                  <div
                  key={`source-${source.sourceId}`}
                  className={[
                    'autocomplete-source',
                    state.status === 'stalled' &&
                    'autocomplete-source-stalled',
                  ]
                  .filter(Boolean)
                  .join(' ')}
                  >
                      
                        {!!items  && (
                          <ul
                          {...autocomplete.getListProps()}
                          className='autocomplete-items'
                          >
                           {items?.map(
                             (item)=>{
                               const itemProps = autocomplete.getItemProps({
                                 item, 
                                 source
                                })

                                return (
                                    <li  key={item.objectID} {...itemProps}>
                                        <div
                                  className={[
                                    'autocomplete-item',
                                    itemProps['aria-selected'] &&
                                    'autocomplete-item-selected',
                                  ]
                                  .filter(Boolean)
                                    .join(' ')}
                                    >
                                  <AccountItem hit={item}  />
                                </div>
                                    </li>
                                )
                            }
                           )}
                            </ul>
                        )}
                    </div>
                )
                )}
        </div>
                </div>
    </div>
  )
}

export default AutoComplete