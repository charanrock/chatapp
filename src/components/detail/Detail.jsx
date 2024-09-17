import { auth, db } from "../../lib/firebase"
import "./detail.css"
const Detail = () => {
  const{ chatId,user,isCurrentUserBlocked,isReceiverBlocked, changeBlock}=
    userChatStore();
  const handleBlock =async()=>{
    if(!user) return;
    const userDocRef =doc(db,"user",currentuser.id)

    try{
      await updateDoc(userDocRef,{
        blocked:isReceiverBlocked ? arrayRemove(user.id) ! arrayUnion(user.id) 
      });
      changeBlock()

    }catch(err){
      console.log(err)
    }
  };
  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar||"./avatar.png"}alt="" />
        <h2> (user?.username)</h2>
        <p>Lorem ipsum dolor sit</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span> chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span> privacy& help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          
            <span> shared photos</span>
            <img src="./arrowUp.png" alt="" />
            <div className="photos">
              <div className="photoitems">
                <div className="photodetail">
                  <img src="https://www.pexels.com/photo/portrait-of-a-macaque-sitting-on-a-tree-branch-26893039/" alt="" />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" />
              </div>
              <div className="photoitems">
                <div className="photodetail">
                  <img src="https://www.pexels.com/photo/portrait-of-a-macaque-sitting-on-a-tree-branch-26893039/" alt="" />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" />
              </div>
              <div className="photoitems">
                <div className="photodetail">
                  <img src="https://www.pexels.com/photo/portrait-of-a-macaque-sitting-on-a-tree-branch-26893039/" alt="" />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" />
              </div>
              <div className="photoitems">
                <div className="photodetail">
                  <img src="https://www.pexels.com/photo/portrait-of-a-macaque-sitting-on-a-tree-branch-26893039/" alt="" />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" className="icons" />
              </div>
            </div>
          
          <div className="option">
            <div className="title">
              <span> shared files</span>
              <img src="./ arrowup.png" alt="" />
            </div>
          </div>
          <button onClick ={handleBlock}>
            {isCurrentUserBlocked
            ?"you are blocked!"
            :isReceiverBlocked
            ? "user blocked"
            : "Block user"}
          </button>
          <button className="logout"onClick={()=>auth.signOut}>logout</button>
        </div>
      </div>
    </div>
  )
}
export default Detail