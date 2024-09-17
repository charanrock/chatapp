import React from 'react'
import './userinfo.css'
import { useUserStore } from '../../../lib/userStore'


const Userinfo = () => {
  const {currentUser}=useUserStore()
  return (
    <div className='userinfo'>
        <div className='user'>
            <img src={currentUser.avatar||'../.././public/avatar.png'} alt="avatar"/>
            <h2>{currentUser.username}</h2>
            <div className='icons'>
                <img src='../.././public/more.png' alt="more"/>
                <img src='../.././public/video.png' alt="video"/>
                <img src='../.././public/edit.png' alt="edit"/>
            </div>
        </div>
    </div>
  )
}

export default Userinfo