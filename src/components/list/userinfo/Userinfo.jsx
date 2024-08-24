import React from 'react'
import './userinfo.css'

const Userinfo = () => {
  return (
    <div className='userinfo'>
        <div className='user'>
            <img src='../.././public/avatar.png' alt="avatar"/>
            <h2 >charan</h2>
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