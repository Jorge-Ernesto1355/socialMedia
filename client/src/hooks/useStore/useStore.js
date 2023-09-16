import { useEffect, useState } from "react"
import store from "./createStore"

export const useStore = ()=>{
  const [state, setState] = useState(store.getState())
  useEffect(()=> store.subscribe(setState), [])
  return state
}