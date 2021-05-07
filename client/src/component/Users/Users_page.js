import React,{useState,useEffect} from 'react'
import './Users_page.css'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import Modal from '../Modal/Modal'

import BoardUpload from '../Board/Board_upload'

import MainImageUpload from '../images/MainImage/MainImageUpload'
import MainImageUpdate from '../images/MainImage/MainImageUpdate'

import ProfileImageUpload from '../images/ProfileImage/ProfileImageUpload'
import ProfileImageUpdate from '../images/ProfileImage/ProfileImageUpdate'



function Users_page() {

  const [UserProfile, setUserProfile] = useState('')
  const [UserID, setUserID] = useState('')
  const [UserName, setUserName] = useState('')
  const [UserEmail, setUserEmail] = useState('')
  const [UserImages, setUserImages] = useState([])
  const [UserMainImage, setUserMainImage] = useState('')
  const [UserInfo, setUserInfo] = useState('')
  
  const [LoggedInUserId, setLoggedInUserId] = useState()
  const [Owner, setOwner] = useState(false)

  const [board, setboard] = useState([].slice(0,25))
  const [pageNumber, setpageNumber] = useState(0)
  
  const { id } = useParams()    

  useEffect(() => {
        Axios.get('http://localhost:3000/images/users_page',{
          params: {
            users_id: id
          }
        }
      )
    .then((response) => {
      console.log(response)      
      setUserImages(response.data.result)      
    })
  }, [id])

  useEffect(() => {
    Axios.get('http://localhost:3000/users',{
          params: {
            users_id: id
          }
        }
      )
    .then((response) => {
      console.log(response)      
      setUserProfile(response.data.result.profile)
      setUserID(response.data.result.users_id)
      setUserName(response.data.result.users_name)
      setUserEmail(response.data.result.email)
      setUserMainImage(response.data.result.main_image)
      setUserInfo(response.data.result.users_info)
    })
  }, [id])

  useEffect(() => {
    if(sessionStorage.getItem('loggedIn') === 'true'){
      setLoggedInUserId(sessionStorage.getItem('id'))  
    }
    if(id === LoggedInUserId) {
      setOwner(true)
    }
  },[id, LoggedInUserId])

  useEffect(() => {
    if(UserProfile === null) {
      setUserProfile('images/admin/emptyProfile.jpg')
    }
    if(UserMainImage === null) {
      setUserMainImage('images/admin/emptyProfile.jpg')
    }
  }, [UserProfile, UserMainImage])

  useEffect(() => {
    Axios.get('http://localhost:3000/board',{
          params: {
            users_id: id
          }
        }
      )
    .then((response) => {
      console.log(response)      
      setboard(response.data.result)
    })
  }, [id])

  const boardPerPage = 10
  const pagesVisited = pageNumber * boardPerPage

  const pageCount = Math.ceil(board.length / boardPerPage)

  const displayBoard = board
                        .slice(pagesVisited, pagesVisited + boardPerPage)
                        .map((board) => {
                          return <div key={board.board_idx} >
                              <a href={`http://localhost:3000/board/${board.board_idx}`}>
                                <div className="board_title">{board.board_title}</div>                            
                              </a>
                            <div className="date">{board.date}</div>
                          </div>
                        })
  
  const changePage = ({selected}) => {
    setpageNumber(selected)
  }
  
  // Board upload, detail Modal
  const [ modalOpen, setModalOpen ] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }



  return (
    <div className="users_page_container">

      <div className="profile_info_board_container">
        <div className="profile">
          <img alt='' src={`http://localhost:3000/${UserMainImage}`} />
          {Owner ? (
            <div className="btns">
              <button className="upload">
                upload
              </button>
              <Modal>

              </Modal>
              <button className="update">update</button>
          </div>
          ) : (
            <div className="btns"></div>
          )}
          
        </div>

        <div className="users_info_board_container">
          <div className="user">

            <div className="user_profile_pic">              
              <img alt='' src={`http://localhost:3000/${UserProfile}`} />
            </div>

            <div className="user_proflie">

              <div className="users_info">

                <div className="users_info_top">
                  <div className="top_top">
                    <div className="users_id">
                      ID : {UserID}
                    </div>
                    <div className="users_name">
                      NAME: {UserName}
                    </div>
                  </div>
                  <div className="top_bottom">
                    <div className="email">
                      {UserEmail}
                    </div>                    
                  </div>
                </div>

                <div className="users_info_bottom">
                  {UserInfo}
                </div>
              </div>
            </div>
          </div>

          <div className="board">
            <div className="board_list">
              {displayBoard}

              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pageNationBtns"}
                previousClassName={"prevBtn"}
                nextLinkClassName={"nextBtn"}
                disabledClassName={"pageNationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>

            {Owner ? (
            <div className="board_btns">              
              <button className="board_post" onClick={ openModal }>
                등록
              </button>
              <Modal open={ modalOpen } close={ closeModal } header="Upload">
                <BoardUpload/>
              </Modal>
              <input type="text" className="serchbar"placeholder="검색"/>

              <button className="board_update">
                검색
              </button>
            </div>
          ) : (
            <div className="board_btns">
              <input type="text" className="serchbar"placeholder="검색"/>
              <button className="board_update">검색</button>
            </div>
          )}
            
            

          </div>
        </div>

      </div>
      <div className='users_image_container'>    
        {UserImages.map((value) => {
          return <div className='users_image_card' key={value.images_idx} id={value.users_id}> 
              <img alt='' src={`http://localhost:3000/${value.images_path}`} />
              <div className="users_id">
                {value.users_id}
              </div>
              <div className="images_name">
                {value.images_name}
              </div>
              <div className="images_info">
                {value.images_info}
              </div>
            </div>
          
          })}    
      </div>
    </div>
  )
}

export default Users_page
