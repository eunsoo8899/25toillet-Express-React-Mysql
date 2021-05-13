import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './Board_users_info.css'

function Board_users_info() {

  const id = sessionStorage.getItem('id')
  const [Constents, setConstents] = useState()
  const [UserInfo, setUserInfo] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:3000/users',{
          params: {
            users_id: id
          }
        }
      )
    .then((response) => {  
      setUserInfo(response.data.result.users_info)
    })
  }, [id])

  const UploadBoard = () => {    
    Axios.put('http://localhost:3000/users',{
      users_id: id,
      users_info: Constents
    }).then((response) => {
      alert(response.data) 
      window.location.pathname = `/users_page/${id}`
    }).catch(err => {
      alert(err.response.data) 
    })
  }

  return (
    <div className='users_info_update'>
      <div className="UserInfo_title_container">
        <h4>현재 대표글</h4>
      </div>
      <div className="prevUserInfo_content">
      {UserInfo}
      </div>
      <div className="UserInfo_title_container">
        <h4>
          수정 할 내용
        </h4>
      </div>
      <div className='users_info_update_input'>    
        <textarea
          placeholder='내용을 입력하세요.'
          type="text"
          maxLength="450"
          onChange={(e) => {
            setConstents(e.target.value)
          }}
        />
      </div>
      <div className="users_info_update_upload_btn_container">
        <button onClick={UploadBoard} className='users_info_update_upload_btn'>등록</button>
      </div>
      
    </div>
  )
}

export default Board_users_info

