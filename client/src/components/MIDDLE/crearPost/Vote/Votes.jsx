import "./Votes.css";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Vote from "./vote";
import _ from "underscore";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import plus from "../icons/plus-sign.png";
import { useDispatch } from "react-redux";
import { VotesRedux } from "../../../../redux/PreviewPostRedux";
import Loader from "../../../../utilities/Loader";

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
  const dispatch = useDispatch();

  const [numForm, setNumForm] = useState([]);
  const [form, setForm] = useState({});

  const allFormsCallback = useCallback(
    () =>
      ({ value, name }) => {
        const updatedForm = {
          ...form,
          [name]: value,
        };
        setForm((prev) => [...prev, updatedForm]);
      },
    [],
  );

  const increase = () =>
    setNumForm((prevNumForm) => [...prevNumForm, uuidv4()]);

  const arrayForms = useMemo(() => {
    return Object.keys(form).map((property) => ({
      uuid: property,
      text: form[property],
    }));
  }, [form]);

  const submitForm = (e) => {
    e.preventDefault();
    const newArray = [...arrayForms];
    dispatch(VotesRedux(newArray));
    setForm({});
    setNumForm([]);
  };

  const expand = useMemo(() => numForm.length >= 4, [numForm]);

  const deletePoll = useCallback(() => {
    hideVotes((prev) => (prev.poll = false));
    setForm({});
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
                        updateForm={allFormsCallback}
                        votes={form}
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
