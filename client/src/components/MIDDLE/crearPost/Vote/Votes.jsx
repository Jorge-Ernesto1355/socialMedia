import "./Votes.css";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Vote from "./vote";

import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import plus from "../icons/plus-sign.png";

import Loader from "../../../../utilities/Loader";
import CreatePostStore from "../../../../zustand/CreatePostStore";

const variants = {
  show: {
    scale: 1,
    opacity: 1,
  },

  hide: {
    scale: 0,
    opacity: 0,
  },
};

const Votes = ({ VotesActive, hideVotes }) => {
  const { addVotes, delVotes } = CreatePostStore()
  const [numForm, setNumForm] = useState([]);
  const [votes, setVotes] = useState([]);

  const vote = ({ value, name }) => {
   
    const updatedvote = {
      ...votes,
      [name]: value,
    };
    setVotes(updatedvote)

  
    const convertVotesToArray = Object.keys(votes).map((vote) => ({
      uuid: vote,
      text: votes[vote]
    }))

    addVotes(convertVotesToArray)
  }

  const increase = () =>
    setNumForm((prevNumForm) => [...prevNumForm, uuidv4()])

  const submitForm = (e) => {
    e.preventDefault();
    // dellVotes is a zustand function 
    delVotes()
    setVotes([]);
    setNumForm([]);
  };

  const expand = useMemo(() => numForm.length >= 4, [numForm]);

  const deletePoll = useCallback(() => {
    hideVotes((prev) => (prev.poll = false));
    // dellVotes is a zustand function 
    delVotes()
    setVotes([]);
    setNumForm([]);

  }, []);

  useEffect(() => {
    increase();
    increase();
  }, [deletePoll]);



  return (
    <>
      {VotesActive && (
        <Suspense fallback={<Loader />}>
          <div className="votes">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              variants={variants}
              animate={`${VotesActive ? "show" : "hide"}`}
              transition={{ duration: 0.2 }}
            >
              <div className={`poll-votes ${expand && "expand"} `}>
                <form className="form-votes" onSubmit={(e) => submitForm(e)}>
                  <div>
                    {numForm.map((i, index) => (
                      <Vote
                        key={i}
                        updateVote={vote}
                        votes={votes}
                        uuid={i}
                        index={index}
                      />
                    ))}
                  </div>
                </form>
                {!expand && (
                  <div className="button-form-votes">
                    <button role="increase-vote" onClick={() => increase()}>
                      <img src={plus} alt="plus-vote" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
            <div className="delete-votes" onClick={() => deletePoll()}>
              Eliminar votos
            </div>
          </div>
        </Suspense>
      )}
    </>
  );
};

export default React.memo(Votes);
