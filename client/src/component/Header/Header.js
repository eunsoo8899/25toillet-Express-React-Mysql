import React, { useEffect, useState} from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'
import Signin from '../Users/Signin'
import Signup from '../Users/Signup'

function Header() {

  const [loggedIn, setloggedIn] = useState(false)
  const [profilePicture, setprofilePicture] = useState('')

  const id = sessionStorage.getItem('id')


  useEffect(()=> {
    if(sessionStorage.getItem('loggedIn') === 'true'){
      setloggedIn(true)
      setprofilePicture(`http://localhost:3000/${sessionStorage.getItem('profile')}`)
    }
    // profile 사진이 없을 경우
    if(sessionStorage.getItem('profile') === 'null') {
      setprofilePicture('http://localhost:3000/images/admin/emptyProfile.jpg')
    }
  }, [])  

  const [ modalOpen, setModalOpen ] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }

  const [ modalOpen2, setModalOpen2 ] = useState(false);
  const openModal2 = () => {
    setModalOpen2(true);
  }
  const closeModal2 = () => {
    setModalOpen2(false);
  }

  return (
    <div className="header">

      <div className="header_left">                
        <Link to='/'>
          <img 
            className="header_logo"            
            src='http://localhost:5000/images/test1/25toiletLogo.png'
            alt='logo'/>        
        </Link>
      </div>

      <div className="header_center">
        <Link to='/work'>
          <div className="contact">Work</div>
        </Link>
        <Link to='/about'>
          <div className="contact">About</div>
        </Link>
        <Link to='/contact'>
          <div className="contact">contact</div>
        </Link>
        <Link to='/store'>
          <div className="contact">Store</div>
        </Link>
        
      </div>

      <div className="header_right">
        {loggedIn ? (
          <div className='propfile_dropdown'>
            <img alt='' src={profilePicture} className='profile_btn'/>
            <div className="profile_dropdown_content">
              <div className="profile_dropdown_content_id">{id}</div>
              <br/>
              <div className="dropdown_contents">
                <button onClick={() => {
                  window.location.pathname = `//users_page/${id}`
                }}>
                  <div> - 개인페이지</div>
                </button>
                <button onClick={() => {
                  window.location.pathname = `/upload/${id}`
                }}>
                  <div> - 작품 등록</div>
                </button>                
                <button className="dropdown_contents_logout_bttn"
                  onClick={()=> {
                    sessionStorage.clear()
                    window.location.pathname = '/'
                  }}> - 로그 아웃
                </button>
              </div>
              
            </div>   
          </div>
        ): (        
          <div className='sign_btns'>
            <button className='sign_btn' onClick={ openModal } >              
              Sign In      
            </button>
            <Modal open={ modalOpen } close={ closeModal } header="Sign in">
              <Signin/>
            </Modal>

            <button className='sign_btn' onClick={ openModal2 } >              
              Sign Up      
            </button>
            <Modal open={ modalOpen2 } close={ closeModal2 } header="Sign up">
              <Signup/>
            </Modal>
          </div>
        )}
        
      </div>

    </div>
  )
}

export default Header
