import { useRef, useState, useEffect } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"
import {
  doc,
  LoadBundleTask,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setopen] = useState(false);
  const [text, setText] = useState("");
  const [img,setImg] = useState({
    file:null,
    url:"",
  });

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked,isReceiverBlocked } = useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });


  }, []);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", chatId), (res) => {
      console.log(res.data())
      setChat(res.data());

    })
    return () => {
      unSub();
    };

  }, [chatId])
  console.log(chat)

  const handleemoji = (e) => {
    setText(prev => prev + e.emoji);
    setopen(false)
  };
  const handleImg = e => {
    if (e.target.files[0]) {
        setImg({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        });
    }
  };
  const handleSend = async () => {
    if (text === "") return;

    let(text ==="") return;

    let imgUrl =null
    try {
      if(img.file){

        imgUrl =await uploadBytes(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        message: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img: imgUrl}),

        })
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id)
        const userChatsSnapshot = await getDoc(userChatsRef)
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data()
          const chatINdex = userChatsData.chats.findIndex{
            (c) => c.chatId === chatId
        };

        userChatData.chats[chatIndex].lastMessage = text;
        userChatsData.chats[chatINdex].isSeen = id === currentUser.id ? true:false;
        userChatsData.chats[chatINdex].updatedAt = Data.now();
        await updateDoc(userChatsRef, {
          chat: userChatsData.chats,
        });
      })
    }

    }catch (err) {
    console.log(err)
  }

  setImg({
    file:null,
    url:""
  })

  setText("")
}

return (
  <div className='chat'>
    <div className="top">
      <div className="user">
        <img src={user?.avatar||"./avatar.png"} alt="" />
        <div className="texts">
          <span>(user?.username)</span>
          <p>lorem ipsum dolor.sit amet.</p>
        </div>


      </div>

      <div className="icons">
        <img src="./phone.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./info.png" alt="" />
      </div>
    </div>
    <div className="center">
      {chat?.message?.map((message) => (
        <div classname={message.senderId===currentUser?.id?"message"} key={message?.createAt}>
          {message.img && <img
            src={message.img}
            alt="" />}
          <div className="texts">
            <p>
              {message.text}
            </p>
            {/* <span>{message}</span>*/}
          </div>
        </div>
      ))}
      {img.url&&(
        <div className="message own">
          <div className="texts">
            <img src ={img.url} alt =""/>  
          </div> 
        </div>
      )}
    </div>
    <div className="bottom">
      <div className="icons">
        <lable htmlFor="file">
         <img src="./img.png" alt="" />
        </lable>
        <input type="file" id ="file" style={{display:none}}onChange ={handleImg}/>
        <img src="./camera.png" alt="" />
        <img src="./mic.png" alt="" />
      </div>
      <input type="text" 
        placeholder={ (isCurrentUserBlocked || isReceiverBlocked) ? "you cannot send a message" : Type a message..."} 
        value={text} 
        onChange={e => setText(e.target.value)}
        disabled={isCurrentUserBlocked ||isReceiverBlocked}
      />
      <div className="emoji">
        <img src="./emoji.png" alt="" onClick={() => setopen(prev => !prev)} />
        <div className="picker">
          <EmojiPicker open={open} onEmojiClick={handleemoji} />
        </div>
      </div>
      <button className="sendbutton" onClick={handleSend} disabled={isCurrentUserBlocked ||isReceiverBlocked}>
        send</button>

    </div>

  </div >)
}
export default Chat