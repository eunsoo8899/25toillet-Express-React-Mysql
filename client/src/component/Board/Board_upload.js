import React, { useState } from 'react'
import Axios from 'axios'
import './Board_upload.css'

function Board_upload() {

  const id = sessionStorage.getItem('id')
  const [Title, setTitle] = useState()
  const [Constents, setConstents] = useState()

  const UploadBoard = () => {    
    Axios.post('http://localhost:3000/board',{
      board_title: Title,
      board_content: Constents,
      users_id: id
    }).then((response) => {
      window.location.pathname = `/users_page/${id}`
    }).catch(err => {
      alert(err.response.data) 
    })
  }

  return (
    <div className='board_upload'>
      <div className="title_container">
        <div className='board_upload_input_title'>        
          <input 
            type="text"
            placeholder='제목을 입력하세요.'
            onChange={(e)=>{
              setTitle(e.target.value)
            }}
          />
        </div>
      </div>
    
      <div className='board_upload_input'>      
        <textarea
          placeholder='내용을 입력하세요.'
          type="text" 
          onChange={(e) => {
            setConstents(e.target.value)
          }}
        />
      </div>

      <button onClick={UploadBoard} className='board_upload_btn'>등록</button>
      
    </div>
  )
}

export default Board_upload

