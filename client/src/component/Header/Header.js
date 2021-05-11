import React, { useEffect, useState} from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'

import Modal from '../Modal/Modal'
import ModalUpdate from '../Modal/ModalUpdate'
import Signin from '../Users/Signin'
import Signup from '../Users/Signup'
import ProfileImage from '../images/ProfileImage/ProfileImageUpdate'

function Header() {

  const [loggedIn, setloggedIn] = useState(false)
  const [profilePicture, setprofilePicture] = useState('')

  const id = sessionStorage.getItem('id')

  useEffect(() => {
    Axios.get('http://localhost:3000/users',{
          params: {
            users_id: id
          }
        }
      )
    .then((response) => {
      if(response.data.result.profile) {
        setprofilePicture(response.data.result.profile)
      } else {
        setprofilePicture('/images/admin/emptyProfile.jpg')
      }   
    })
  }, [id])


  useEffect(()=> {
    if(sessionStorage.getItem('loggedIn') === 'true'){
      setloggedIn(true) 
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

  
  const [ modalOpen3, setModalOpen3 ] = useState(false);
  const openModal3 = () => {
    setModalOpen3(true);
  }
  const closeModal3 = () => {
    setModalOpen3(false);
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
            <img alt='' src={`http://localhost:3000/${profilePicture}`} className='profile_btn'/>
            <div className="profile_dropdown_content">
              <div className="profile_dropdown_content_id">{id}</div>
              <br/>
              <div className="dropdown_contents">
                <button onClick={() => {
                  window.location.pathname = `/users_page/${id}`
                }}>
                  <div className="dropdown_contents_title"> - 개인페이지</div>
                </button>
                <button onClick={() => {
                  window.location.pathname = `/upload/${id}`
                }}>
                  <div className="dropdown_contents_title"> - 작품 등록</div>
                </button>
                <button onClick={ openModal3 }>
                  <div className="dropdown_contents_title"> - 프로필 사진 변경</div>
                </button>
                <ModalUpdate open={ modalOpen3 } close={ closeModal3 } header="Sign in">
                  <ProfileImage/>
                </ModalUpdate>           
                <button
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
