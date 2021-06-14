import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Banner.css'
import ModalUpdate from '../../Modal/ModalUpdate'
import BannerUpload from '../../Banner/BannerUpload'
import BannerUpdate from '../../Banner/BannerUpdate'

function Banner() {

  const [Banner, setBanner] = useState('')
  const [admin, setadmin] = useState(false)

  useEffect(() => {
    Axios.get('https://api.25toillet.xyz/users', {
      params:{
        users_id: '25toillet'
      }
    }).then((response) => {
      console.log(response)
      setBanner(`https://api.25toillet.xyz/${response.data.result.banner}`)
    })
  }, [])

  useEffect(() => { 
    if(sessionStorage.getItem('id') === '25toillet') {
      setadmin(true)
    }
}, [])

// banner upload modal
const [ modalOpen, setModalOpen ] = useState(false);
const openModal = () => {
  setModalOpen(true);
}
const closeModal = () => {
  setModalOpen(false);
}
// banner Update modal
const [ modalOpen2, setModalOpen2 ] = useState(false);
const openModal2 = () => {
  setModalOpen2(true);
}
const closeModal2 = () => {
  setModalOpen2(false);
}

  return (
    <div>
      {admin ? (
        <div className="BannerContainer">
          <div className="banner_image_container">
            <img alt='' src={Banner}/>
          </div>
          <div className="banner_button_container">
            <button onClick={ openModal } className="banner_button_container_btn">등록</button>
            <ModalUpdate open={ modalOpen } close={ closeModal } header="배너 이미지 등록">
                <BannerUpload/>
              </ModalUpdate>
            <button onClick={ openModal2 } className="banner_button_container_btn">변경</button>
            <ModalUpdate open={ modalOpen2 } close={ closeModal2 } header="배너 변경">
                <BannerUpdate/>
              </ModalUpdate>
          </div>
        </div>
      ) : (
        <div className="BannerContainer">
          <img alt='' src={Banner}/>    
        </div>

      )}
    

    </div>
  )
}

export default Banner
