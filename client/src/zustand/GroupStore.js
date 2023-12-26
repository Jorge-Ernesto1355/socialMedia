import { create } from "zustand";

const GroupStore = create((set, get) => ({
  participants: new Set(),
  nameGroup: "",
  photoGroup: null,
  addParticipant: (participant) => {
    if (!participant || typeof participant === "undefined") return null;
    const { participants } = get();

    if (participants.has(participant._id)) return null;

    set((state) => ({
      participants: new Set([...state.participants, participant]),
    }));
  },
  deleteParticipant: (id) => {
    if (!id) return null;

    set((state) => {
      const newParticipants = new Set([...state.participants]);

      // Encontrar el índice del participante en el array
      const participantIndex = [...newParticipants].findIndex(
        (participant) => participant._id === id,
      );

      // Si se encuentra, eliminar el participante del array
      if (participantIndex !== -1) {
        newParticipants.delete([...newParticipants][participantIndex]);
      }

      return { participants: newParticipants };
    });
  },
  getParticipants: () => {
    const { participants } = get();
    return Array.from(participants);
  },
}));

export default GroupStore;
