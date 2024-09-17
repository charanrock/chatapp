import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';

export const useChatStore = create((set) => ({
    chatId: null,
    user:null,
    isCurrentUserBLocked:false,
    isRecevierBLocked:false,
    changeChat:(chatId,user)=>{
        const currentUser =useUserstore.getState().currentUser

        if(user.blocked.includes(currentUser.id)){
            return set({
                chatId,
                user:null,
                isCurrentBLocked:true,
                isReceiverBlocked:false,
            });
        }
        //
        else if(currentUser.blocked.includes(user.id)){
            return set({
                chatId,
                user:user,
                isCurrentBLocked:false,
                isReceiverBlocked:true,
            });
        }else{
            return set({
                chatId,
                user,
                isCurrentBLocked:false,
                isReceiverBlocked:false,
            });

        }


        
        
    },
    changeBlock:()=>{
        set(state=>({... state,isReceiverBlocked:! state.isReceiverBlocked}))
    }
}))
