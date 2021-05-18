import React, { useEffect, useState, useRef} from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import {useDetect} from './useDetect'

import Modal from '../Modal/Modal'
import ModalUpdate from '../Modal/ModalUpdate'
import Signin from '../Users/Signin'
import Signup from '../Users/Signup'
import ImageUpload from '../images/Upload/Upload'
import ProfileImageUpload from '../images/Upload/UploadProfile'
import ProfileImage from '../images/ProfileImage/ProfileImageUpdate'

function Header() {

  const [loggedIn, setloggedIn] = useState(false)
  const [profilePicture, setprofilePicture] = useState('')

  const id = sessionStorage.getItem('id')

  const dropdownRef = useRef(null)
  const [isActive, setisActive] = useDetect(dropdownRef, false)
  const onClick = () => setisActive(!isActive)

  useEffect(() => {
    Axios.get('http://localhost:3000/users',{
          params: {
            users_id: id
          }
        }
      )
    .then((response) => {
      if(response.data.result.profile) {
        setprofilePicture(`http://localhost:3000/${response.data.result.profile}`)
      } else {
        setprofilePicture('https://i.pinimg.com/564x/34/c2/f9/34c2f984350ed23d1efa7094d7923c5a.jpg')
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

  const [ modalOpen4, setModalOpen4 ] = useState(false);
  const openModal4 = () => {
    setModalOpen4(true);
  }
  const closeModal4 = () => {
    setModalOpen4(false);
  }

  const [ modalOpen5, setModalOpen5 ] = useState(false);
  const openModal5 = () => {
    setModalOpen5(true);
  }
  const closeModal5 = () => {
    setModalOpen5(false);
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
            <button className='profile_btn'onClick={onClick}>
              <img 
                src={profilePicture}  
                alt="" 
                className="profile_btn"
              />
            </button>
            <div ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <div className="profile_dropdown_content_id">{id}</div>
              <br/>
              <div className="dropdown_contents">
                <button onClick={() => {
                  window.location.pathname = `/users_page/${id}`
                }}
                className="dropdown_contents_btn"
                >
                  <div className="dropdown_contents_title"> - 개인페이지</div>
                </button>
                
                <button onClick={ openModal3 } className="dropdown_contents_btn">
                  <div className="dropdown_contents_title"> - 작품 등록</div>
                </button>
                
                <button onClick={ openModal4 } className="dropdown_contents_btn">
                  <div className="dropdown_contents_title"> - 프로필 사진 등록</div>
                </button>
                
                <button onClick={ openModal5 } className="dropdown_contents_btn">
                  <div className="dropdown_contents_title"> - 프로필 사진 변경</div>
                </button>

                    
                <button
                  onClick={()=> {
                    sessionStorage.clear()
                    window.location.pathname = '/'
                  }}
                  className="dropdown_contents_btn"
                  > - 로그 아웃
                </button>
              </div>
              
            </div>
            <ModalUpdate open={ modalOpen3 } close={ closeModal3 } header="작품 등록">
              <ImageUpload/>
            </ModalUpdate>
            <ModalUpdate open={ modalOpen4 } close={ closeModal4 } header="프로필 사진 등록">
              <ProfileImageUpload/>
            </ModalUpdate> 
            <ModalUpdate open={ modalOpen5 } close={ closeModal5 } header="프로필 사진 변경">
              <ProfileImage/>
            </ModalUpdate>
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
