import { create } from "zustand";

export const useSelf = create((set)=>({
    id: -1,
    name:"",
    setId: (id)=>{set({id:id})},
    setName:(name)=>{set({name:name})}
}))

export const useRoom = create((set)=>({
    code:0,
    players:[],
    setCode:(code)=>{set({code:code})},
    setPlayers:(newList)=>{set((state)=>{return {code:state.code, players: newList}})}
}))

export const useGame = create((set)=>({
    isDraw: false,
    image: "",
    prompt: "",
    setIsDraw: ()=>{set((state)=>{return {isDraw: !state.isDraw, image: state.image,prompt: state.prompt}})},
    setImage: (url)=>{set({image:url})},
    setPrompt: (prompt)=>{set({prompt: prompt})},
}))