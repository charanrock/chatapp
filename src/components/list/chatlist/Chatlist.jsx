import React, { useState } from 'react'
import './chatlist.css'

const Chatlist = () => {
  return (
    <div className='Chatlist'>
      <div className='search'>
      <div className='searchBar'>
        <img src='../.././public/search.png'/>
        <input type='text' placeholder='search person'/>
      </div>
      <img src=" ./plus.png" alt="" className='add'/>
      </div>
      <div className='item'>
        <img src='../././avatar.png' alt=''/>
        <div className='texts'>
          <span>jane doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='../././avatar.png' alt=''/>
        <div className='texts'>
          <span>jane doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='../././avatar.png' alt=''/>
        <div className='texts'>
          <span>jane doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='../././avatar.png' alt=''/>
        <div className='texts'>
          <span>jane doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='../././avatar.png' alt=''/>
        <div className='texts'>
          <span>jane doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='../././avatar.png' alt=''/>
        <div className='texts'>
          <span>jane doe</span>
          <p>hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chatlist