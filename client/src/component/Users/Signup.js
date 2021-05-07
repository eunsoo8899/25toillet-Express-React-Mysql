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
    
      <div className='signup_input'>        
        <input 
          type="id"
          placeholder='ID'
          onChange={(e)=>{
            setid(e.target.value)
          }}
        />
      </div>
    
      <div className='signup_input'>      
        <input
          placeholder='password'
          type="password" 
          onChange={(e) => {
            setpassword(e.target.value)
          }}
        />
      </div>

      <div className='signup_input'>        
        <input 
          placeholder='password confirm'
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

      <div className='signup_input'>      
        <input 
          placeholder='email'
          type="email"
          onChange={(e)=>{
            setemail(e.target.value)
          }}         
        />
      </div>
      
      <button onClick={signup} className='signup_btn'>submit</button>
      
    </div>
  )
}

export default Signup
