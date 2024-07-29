import { create } from "zustand";

export const useSelf = create((set)=>({
    name:"",
    setName:(name)=>{set({name:name})}
}))

export const useRoom = create((set)=>({
    code:0,
    players:[],
    setCode:(code)=>{set({code:code})},
    setPlayers:(newList)=>{set((state)=>{return {code:state.code, players: newList}})}
}))