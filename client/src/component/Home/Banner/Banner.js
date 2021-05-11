import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Banner.css'

function Banner() {

  const [Banner, setBanner] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:3000/images', {
      params:{
        users_id: 'admin'
      }
    }).then((response) => {
      console.log(response)
      setBanner({
        banner: response.data.result[8].images_path
      })
    })
  }, [])

  return (
    <div className="BannerContainer">
      <img alt='' src={Banner.banner}/>    
    </div>
  )
}

export default Banner
