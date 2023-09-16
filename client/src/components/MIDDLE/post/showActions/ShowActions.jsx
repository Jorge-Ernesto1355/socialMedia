import React, { useEffect, useState } from 'react';
import './ShowActions.css';

import { objetsImgs } from '../post/objectImg';
import cross from '../../../../assets/cross.png';
import { AnimatePresence, motion } from 'framer-motion';
import ShowPersons from './ShowPersons';
import { GetUsersOfActions } from '../services/actions/actions';
import ConcatUserWithActions from './concatUserWithActions';
import { CallbackRequest, GetReactionsPost } from '../useQuery/useQuerys';
import ShowAllPersons from './ShowAllPersons';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll/useInfiniteScroll';

const  ShowActions = ({
  changeShowActions,
  showAction,
  id,
  reactionsView, 
  reqReactions, 
  reqReaction, 
  name
}) => {
  const [isSelected, setIsSelected] = useState({ label: 'todos' });

  const {results:reactions, isLoading, isError, hasNextPage, fetchNextPage} = useInfiniteScroll({name, id, request:reqReactions })
 
  
  const variantsPhotos = {
    visible: {
      scale: 1,
      transition: {
        duration: 0.2
      }
    },
    hidden: {
      scale: 0,
      y: -100,
      transition: {
        duration: 0.2
      }
    }
  };
  return (
    <motion.div
      className="container-action"
      variants={variantsPhotos}
      animate={showAction ? 'visible' : 'hidden'}
    >
      {isError && (
        <div className="somethingWrong-action">
          <h4>algo salio mal</h4>
          <div className="second">
            <button
              className="cross-action"
              onClick={() => changeShowActions(false)}
            >
              <img src={cross} alt="" />
            </button>
          </div>
        </div>
      )}
      {isLoading ? 'loading' : (
        <>
        <div className="head-action">
          <div className="first">
            <h3
              className="watchAll"
              onClick={() => setIsSelected({ label: 'todos' })}
            >
              ver todos
              {'todos' === isSelected.label ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </h3>
            {reactionsView?.map((reaction) => (
              <div key={`reaction-showAction=${reaction?._id}`}>
                <img
                  src={objetsImgs[reaction?.label]}
                  alt=""
                  onClick={() => setIsSelected(reaction)}
                />
                {reaction?.label === isSelected.label ? (
                  <motion.div className="underline" layoutId="underline" />
                ) : null}
                <h5
                  className={`${reaction?.label}`}
                >
                  {reaction?.length}
                  
                </h5>
              </div>
            ))}
          </div>
          <div className="second">
            <button
              className="cross-action"
              onClick={() => changeShowActions(false)}
            >
              <img src={cross} alt="" />
            </button>
          </div>
        </div>

        <div className="culo"></div>

        <AnimatePresence exitBeforeEnter>
          <motion.div
            className="body-action"
            key={isSelected ? isSelected.label : 'empty'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
           
            <div className="down-edit">
            {reactionsView?.filter(reaction => isSelected.label === reaction?.label).map((reaction)=>(
  <ShowPersons label={reaction?.label} id={id} key={`showPersons-key=${reaction?._id}`} reqReaction={reqReaction} />
))}
{isSelected.label === 'todos' && (
  <ShowAllPersons reactions={reactions} isError={isError} isLoading={isLoading} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>
) }

            </div>
          </motion.div>
        </AnimatePresence>
      </>
      )}
        
      
    </motion.div>
  );
};

export default ShowActions;
