import React, { useState } from 'react'
import './Signin.css'
import Axios from 'axios'

function Signin() {
  const [Id, setId] = useState()
  const [Password, setPassword] = useState()
  
  const signin = () => {
    Axios.post('https://api.25toillet.xyz/users/signin',{
      users_id: Id,
      users_pwd: Password,      
    })    
    .then((response) => {      
        console.log(response)
        sessionStorage.setItem("loggedIn", 'true')
        sessionStorage.setItem("id", Id)  
        window.location.pathname = '/'  
    })
    .catch(err => {
      alert(err.response.data)  
    })
  }


  return (
    <div className='signin'>   

      {/* <div>{Error}</div> */}
    
      <div className='signin_input'>        
          <input 
            type="text"
            placeholder='ID'
            onChange={(e) => {
              setId(e.target.value)
          }}
          />
        
      </div>

      <div className='signin_input'>        
        <input 
          type="password"
          placeholder='Password'
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
        
      <button onClick={signin} className='signIn_btn'>Sign IN</button>

    </div>  
  )
}

export default Signin
