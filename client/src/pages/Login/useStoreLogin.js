import { useCallback, useRef, useSyncExternalStore } from "react";

function useStoreData() {
  const store = useRef({
    email:'', 
    password:''
  });

  const get = useCallback(() => {
    if (store.current) return store.current;
  }, []);

  const subscribers = useRef(new Set());

  const set = useCallback((value, name) => {
    if (store.current){
        store.current = {...store.current, ...value}
    }
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
    store
  };
}

export const useStoreLogin = (selector) => {
  const store = useStoreData();
  if (!store) {
    throw new Error("Store not found");
  }
  const state = useSyncExternalStore(store.subscribe, store.get);

  return [state, store.set];
};
