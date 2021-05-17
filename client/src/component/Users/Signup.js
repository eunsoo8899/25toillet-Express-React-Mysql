import React, { useState } from 'react'
import Axios from 'axios'
import './Signup.css'

function Signup() {

  //users_id,users_pwd,users_pwd_confirm, users_name, 
  // address, address_detail, email
  const [id, setid] = useState()
  const [password, setpassword] = useState()
  const [password_confirm, setpassword_confirm] = useState()
  const [name, setname] = useState()  
  const [email, setemail] = useState()
  const [InputVerifyKey, setInputVerifyKey] = useState(1)
  const [DbVerifyKey, setDbVerifyKey] = useState(0)
  const [btn, setbtn] = useState(false)

  const duplicate = () => {
    Axios.post('http://localhost:3000/users/duplicate',{
      users_id: id  
    }).then((response) => {
      console.log(response)
      alert(response.data) 
    }).catch(err => {
      alert(err.response.data) 
    })
  }

  const sendEmail = () => {
    Axios.post('http://localhost:3000/users/sendVerify',{
      email: email  
    }).then((response) => {
      setDbVerifyKey(response.data.key_for_verify)
      alert('메일을 전송했습니다.')
      console.log(DbVerifyKey)
    }).catch(err => {
      alert(err.response.data) 
    })
  }

  const cheackVerifyKey = () => {  
      if (DbVerifyKey === InputVerifyKey) {
        setbtn(true)
        alert('인증되었습니다.')
      } 
    }

  const signup = () => {    
    Axios.post('http://localhost:3000/users/signup',{
      users_id: id,
      users_pwd: password,
      users_pwd_confirm: password_confirm,
      users_name: name,      
      email: email
    }).then((response) => {
      console.log(response)
      window.location.pathname = '/'
    }).catch(err => {
      alert(err.response.data) 
    })
  }

  return (
    <div className='signup'>
      <div className="IDinput_container">
        <div className='signup_input_id'>        
          <input 
            type="text"
            placeholder='ID(i7글자 이상으로 해주세요)'
            onChange={(e)=>{
              setid(e.target.value)
            }}
          />
        </div>
        <div className="Duplication_btn_container">
          <button
            onClick={duplicate}
          >중복체크</button>
        </div>
      </div>
    
      <div className='signup_input'>      
        <input
          placeholder='Password(8글자 이상으로 해주세요.)'
          type="password" 
          onChange={(e) => {
            setpassword(e.target.value)
          }}
        />
      </div>

      <div className='signup_input'>        
        <input 
          placeholder='Password confirm'
          type="password" 
          onChange={(e) => {
            setpassword_confirm(e.target.value)
          }}
        />
      </div>

      <div className='signup_input'>
        <input 
          placeholder='name'
          type="text"
          onChange={(e) => {
            setname(e.target.value)
          }}          
        />
      </div>

      <div className="IDinput_container">
        <div className='signup_input_id'>        
          <input 
            type="text"
            placeholder='Email'
            onChange={(e)=>{
              setemail(e.target.value)
            }}
          />
        </div>
        <div className="Duplication_btn_container">
          <button
            onClick={sendEmail}
          >인증 메일 발송</button>
        </div>
      </div>

      <div className="IDinput_container">
        <div className='signup_input_id'>        
          <input 
            type="text"
            placeholder='인증번호 입력'
            onChange={(e)=>{
              setInputVerifyKey(e.target.value)
            }}
          />
        </div>
        <div className="Duplication_btn_container">
          <button
            onClick={cheackVerifyKey}
          >인증 번호 확인</button>
        </div>
      </div>
      
      {btn ? (
        <div className="signup_btn_container">
          <b>인증되었습니다</b>
          <button onClick={signup} className='signup_btn'>회원 가입</button>
        </div>
      ) : (
        <div className="signup_btn_container">
        <b>인증번호 확인을 눌러주세요</b>
        </div>
      )}
      
    </div>
  )
}

export default Signup
