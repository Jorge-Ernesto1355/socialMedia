import "./Votes.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Vote from "./vote";

import { v4 as uuidv4 } from "uuid";
import plus from "../icons/plus-sign.png";
import CreatePostStore from "../../../../zustand/CreatePostStore";
import { Card} from "antd";
import { DeleteOutlined } from "@ant-design/icons";



const Votes = ({hideVotes }) => {
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
    hideVotes((prev) => !prev?.poll);
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
         <Card className="votes"
         bodyStyle={{padding: "5px"}}
         style={{maxWidth: "90%"}} 
         actions={[
          <DeleteOutlined key={"delete"} onClick={()=> hideVotes()} />
         ]}
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
              
             
         </Card>
        
     
    </>
  );
};

export default React.memo(Votes);
