import "./addUser.css"
import {db} from "../../../../lib/firebase";
import {
    collection,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { useState } from "react";
import {useUserStore} from "../../../../lib/userStore"
const AddUser =() =>{
    const [user,setUser] =useState(null);
    const {currentUser}= useUserStore()

    const handleSearch = async e=>{
        e.preventDefault()
        const formData =new FormData(e.target)
        const username =formData.get("username")

        try{
            const userRef =collection(db,"users");

            const q =query(userRef,where("username","==",username));
            const quertSnapShot =await getDoc(q)
            if(! QuerySnapshot.empty){
                setUser(querySnapShot.doc[0].data());
            }


        }catch(err){
            console.log(err)
        }

    };

    const handleAdd =async() =>{
        const chatRef =collection(db,"chats")
        const userChatsRef = collection(db,"userchats")

        try{
            const newChatRef =doc(chatRef)
            await setDoc(newChatRef,{
                createdAt:serverTimestamp(),
                message:[],
            });
            await updatedDoc(Doc(userChatsRef,user.id),{
  
                chats:arrayUnion({
                    chatId:newChatRef.id,
                    lastMessage:"",
                    receiverId: current.id,
                    updatedAt:Date.now(),

                }),
            });
            await updatedDoc(Doc(userChatsRef,currentUser.id),{
  
                chats:arrayUnion({
                    chatId:newChatRef.id,
                    lastMessage:"",
                    receiverId: user.id,
                    updatedAt:Date.now(),

                }),
            });
            console.log(newChatRef.id);
        }

            catch(err){
                console.log(err);
            }
        
    };


    return(
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username"/>
                <button>Search</button>
            </form>
            {user&&<div className="user">
                <div className="detail">
                    <img src={user.avatar ||"./avatar.png"} alt=""/>
                    <span>(user.username)</span>

                </div>
                <button onClick>{handleAdd}Add User</button>
            </div>}
        </div>

    )
}

export default AddUser