import { useCallback, useRef, useSyncExternalStore } from "react";

function useStoreData() {
  const store = useRef();

  const get = useCallback(() => {
    if (store.current) return store.current.value;
  }, []);

  const subscribers = useRef(new Set());

  const set = useCallback((value) => {
    if (store.current) store.current.value = value;
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
    store,
  };
}

export const useStore = () => {
  const { store, subscribe, get, set } = useStoreData();
  if (!store) {
    throw new Error("Store not found");
  }
  const state = useSyncExternalStore(subscribe, get);

  return { store, state, set, get };
};
