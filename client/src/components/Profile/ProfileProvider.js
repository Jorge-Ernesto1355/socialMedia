import { create } from "zustand";

const profileProvider = create((set)=>({
    tab: "usersPosts", 
    setTab: (tab)=> set({tab})
}))

export default profileProvider