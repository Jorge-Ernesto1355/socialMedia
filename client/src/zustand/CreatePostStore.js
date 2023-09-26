import { create } from "zustand";

const CreatePostStore = create((set, get) => ({
  text: "",
  votes: [],
  difusion: "",
  setText: (text) => set({ text: text() }),
  addVotes: (votes) => {
    if (!votes) return null;
    set({ votes });
  },
  delVotes: () => {
    set({ votes: [] });
  },

  setDifusion: (difusion) => {
    if (!difusion) return;
    set({ difusion });
  },
}));

export default CreatePostStore;
