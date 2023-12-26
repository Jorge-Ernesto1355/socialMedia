import { create } from "zustand";

const CreatePostStore = create((set, get) => ({
  text: "",
  votes: [],
  timeExpiration: 0,
  setText: (text) => set({ text: text() }),
  addVotes: (votes) => {
    if (!votes) return null;
    set({ votes });
  },
  delVotes: () => {
    set({ votes: [] });
  },

  setTimeExpiration: (time) => {
    if (!time) return;
    set({ timeExpiration: time });
  },
}));

export default CreatePostStore;
