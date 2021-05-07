import React, {useEffect,useState} from 'react'
import Axios from 'axios'
import './Account.css'

function Account() {

  const [AccountInfo, setAccountInfo] = useState('')
  const [Profile_pic, setProfile_pic] = useState()

  useEffect(() => {
    const id = sessionStorage.getItem('id')
    Axios.get('http://localhost:3000/users', {
      params:{
        users_id: id
      }
    }).then((response) => {
    console.log(response)
    setAccountInfo({
      id: response.data.result.users_id,
      email: response.data.result.email,
      name: response.data.result.users_name,      
      profile: response.data.result.profile
    })
    setProfile_pic((`http://localhost:3000/${sessionStorage.getItem('profile')}`))
    })
  }, [])

  return (
    <div className='account_container'>
      <img alt='' src={Profile_pic} className="account_modal_profile"/>
      <div className="account_modal_text">
        id : {AccountInfo.id}
      </div>
      <div className="account_modal_text">
        email : {AccountInfo.email}
      </div>
      <div className="account_modal_text">
        name : {AccountInfo.name}      
      </div>
      
      <button onClick={() => {
        window.location.pathname = "/upload"
      }}>
        Upload
      </button>
      <button onClick={() => {
        sessionStorage.clear()
        window.location.pathname = '/'
      }}>
        logout
      </button>
      
    </div>
  )
}

export default Account
