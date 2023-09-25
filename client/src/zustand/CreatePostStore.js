import { create } from "zustand";

const CreatePostStore = create((set, get) => ({
  text: "",
  votes: [],

  setText: (text) => set({ text: text() }),
  addVotes: (votes) => {
    if (!votes) return null;
    set({ votes });
  },
  delVotes: () => {
    set({ votes: [] });
  },
}));

export default CreatePostStore;
