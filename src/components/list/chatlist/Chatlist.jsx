import React, { useEffect, useState } from 'react'
import './chatlist.css'
import AddUser from './addUser/addUser'
import { useUserStore } from "../../../lib/userStore";
import { doc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../../lib/chatStore';
import {onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState(false);

  const { currentUser } = useUserStore();
  const { chatId,changeChat} = useChatStore();
  console.log(chatId)
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async(res) => {
      const items =res.data().chats;
      const promises =items.map(async(item)=>{
        const userDocRef =doc(db,"users",item.receiverId);
        const userDocSnap =await getDoc(userDocRef);

        const user =userDocSnap.data();

        return{...item,user};

      });

      const chatData= await promises.all(promises);
      setChats(chatData.sort((a,b) =>b.updateAt -a.updateAt));





    });
    return () => {
      unSub();
    };

  }, [currentUser.id]);

  const handleSelect = async (chat)=>{
    const userChats =chats.map((item) =>{
      const {user,...rest} =item;
      return rest;

    });
    const chatIndex =userchats.findindex(
      (item) => item.chatId ===chat.chatId
    );

    userChats[chatIndex].isSeen =true;

    const userChatsRef =doc(db,"userChats",currentUser.id);

    try{
      await updateDoc(userChatsRef,{
        chats:userChats,
      });
      changeChat(chat.chatId,chat,user);

    }catch(err){
      console.log(err)
    }

  };
  const filteredChats =chats.filter((c)=>
  c.user.username.toLowerCase().includes(input.toLowerCase())
);

  return (
    <div className='Chatlist'>
      <div className='search'>
        <div className='searchBar'>
          <img src='../.././public/search.png' />
          <input type='text' placeholder='search person' onChange ={(e)=>setInput(e.target.value)}/>
        </div>
        <img src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onclick={() => setAddMode((prev) => !prev)}
        />
      </div>
       {filteredChats.map((chat) => (
        <div className='item' 
          key ={chat.chatId} 
          onClick ={()=>handleSelect(chat.chatId)}
          style={(
            backgroundColor: chat?.isSeen ? "transparant":"#5183fe",
          )}
        >
          <img src={chat.user.blokced.includes(currentUser.id) 
            ?./avatar.png 
            : chat.user.avatar ||'../././avatar.png'} alt='' />
          <div className='texts'>
            <span>(chat.user.blokced.includes(currentUser.id)
              ? "user"
              :chat.user.username)
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  )
}

export default Chatlist