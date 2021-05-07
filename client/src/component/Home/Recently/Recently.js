import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Recently.css'

function Recently() {

  const [Recently, setRecently] = useState([])  

  useEffect(() => {
    Axios.get('http://localhost:3000/images/recently')
    .then((response) => {
      console.log(response)
      setRecently(response.data.result)      
    })
  }, [])


  return (
    <div className='recently_container'>    
      {Recently.map((value, index) => {
        return <a href={`/users_page/${value.users_id}`} key={value.images_idx} id={value.users_id}>
          <div className='image_card' > 
            <img alt='' src={value.images_path} />
          </div>
        </a>
        })}    
    </div>
  )
}

export default Recently
