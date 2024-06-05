import { create } from "zustand";

const profileProvider = create((set)=>({
    tab: 1, 
    setTab: (tab)=> set({tab})
}))

export default profileProvider