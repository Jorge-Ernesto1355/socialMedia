import { create } from "zustand";

const BoxMessagesStore = create((set, get) => ({
  boxMessages: [],
  messageReply: null,
  setBoxMessages: (conversation) => {
    if (!conversation) return null;
    const conversationsIds = get().boxMessages?.map(
      (conversation) => conversation?._id,
    );
    const exitsConverstion = conversationsIds.includes(conversation?._id);

    if (exitsConverstion) return null;

    if (!exitsConverstion)
      set((state) => ({
        boxMessages: [...state.boxMessages, conversation],
      }));
  },
  MessageReply: (messageId) => {
    set({ messageReply: messageId });
  },
  checkConversation: (conversation) => {
    if (!conversation) return null;
    const conversationsIds = get().boxMessages?.map(
      (conversation) => conversation?._id,
    );

    return conversationsIds.includes(conversation?._id);
  },
  deleteMessageReply: () => {
    set({ messageReply: null });
  },
  deleteConversation: (conversationId) => {
    if (!conversationId) return null;
    const conversationsIds = get().boxMessages?.map(
      (conversation) => conversation?._id,
    );
    const exitsConverstion = conversationsIds.includes(conversationId);
    if (exitsConverstion) {
      const withOutConversation = get().boxMessages?.filter(
        (boxConversation) => boxConversation?._id !== conversationId,
      );
      set({ boxMessages: withOutConversation });
    }
  },
}));

export default BoxMessagesStore;
