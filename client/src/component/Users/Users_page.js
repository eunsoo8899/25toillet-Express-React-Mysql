import React,{useState,useEffect} from 'react'
import './Users_page.css'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ModalUpdate from '../Modal/ModalUpdate'
import Modal from '../Modal/Modal'

import BoardUpload from '../Board/Board_upload'
import BoardDetail from '../Board/Board_detail'
import MainImageUpdate from '../images/MainImage/MainImageUpdate'

function Users_page() {

  const [UserProfile, setUserProfile] = useState('')
  const [UserID, setUserID] = useState('')
  const [UserName, setUserName] = useState('')
  const [UserEmail, setUserEmail] = useState('')
  const [UserMainImage, setUserMainImage] = useState('')
  const [UserInfo, setUserInfo] = useState('')
  
  const [LoggedInUserId, setLoggedInUserId] = useState()
  const [Owner, setOwner] = useState(false)

  const [board, setboard] = useState([].slice(0,25))
  const [BoardTitle, setBoardTitle] = useState('')
  const [BoardIdx, setBoardIdx] = useState('')

  const [pageNumber, setpageNumber] = useState(0)

  const [UserImages, setUserImages] = useState([].slice(0,25))
  const [pageNumber2, setpageNumber2] = useState(0)
  
  const { id } = useParams()    

  useEffect(() => {
        Axios.get('http://localhost:3000/images/users_page',{
          params: {
            users_id: id
          }
        }
      )
    .then((response) => {    
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
      setboard(response.data.result)
    })
  }, [id])

    // board Modal
    const [ modalOpen3, setModalOpen3 ] = useState(false);
    const openModal3 = () => {
      setModalOpen3(true);
    }
    const closeModal3 = () => {
      setModalOpen3(false);
    }

    // image detail Modal

  

  const boardPerPage = 10
  const pagesVisited = pageNumber * boardPerPage

  const pageCount = Math.ceil(board.length / boardPerPage)

  const displayBoard = board
  .slice(pagesVisited, pagesVisited + boardPerPage)
  .map((board) => {
    return <div key={board.board_idx} className="board_title_date">
      <button onClick={ openModal3 } className="board_title_btn" onMouseUp={()=>{
        setBoardTitle(board.board_title)
        setBoardIdx(board.board_idx)
      }}>{board.board_title}</button>      
      <div className="date">{board.date}</div>
    </div>
  })


  const imagePerPage = 10
  const pagesVisited2 = pageNumber2 * imagePerPage
  const pageCount2 = Math.ceil(UserImages.length / imagePerPage)
  const displayImage = UserImages
    .slice(pagesVisited2, pagesVisited2 + imagePerPage)
    .map((value) => {
      return <div className='users_image_card' key={value.images_idx} id={value.users_id}> 
      <img 
        alt='' 
        src={`http://localhost:3000/${value.images_path}`} 
        // onMouseUp={}
        // onClick={}
      />
      <div className="images_info">
        <div className="images_info_title">
          {value.images_title}
        </div>
        {/* <div className="images_info_id">
          {value.users_id}
        </div> */}
      </div>
    </div>
    })

  const changePage = ({selected}) => {
    setpageNumber(selected)
  }

  const changePage2 = ({selected}) => {
    setpageNumber2(selected)
  }
  
  // Board upload modal
  const [ modalOpen, setModalOpen ] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  // MainImage Update modal
  const [ modalOpen2, setModalOpen2 ] = useState(false);
  const openModal2 = () => {
    setModalOpen2(true);
  }
  const closeModal2 = () => {
    setModalOpen2(false);
  }




  return (
    <div className="users_page_container">

      <div className="profile_info_board_container">
        <div className="profile">
          <img alt='' src={`http://localhost:3000/${UserMainImage}`} className="profile_mainImage"/>
          {Owner ? (
            <div className="main_image_btns">
              <button className="update_main_image" onClick={ openModal2 }>
                변경
              </button >
              <ModalUpdate open={ modalOpen2 } close={ closeModal2 } header="메인 이미지 변경">
                <MainImageUpdate/>
              </ModalUpdate>              
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
              <div className="board_container">
                {displayBoard}
                <Modal open={ modalOpen3 } close={ closeModal3 } header={BoardTitle} >
                  <BoardDetail boardIdx={BoardIdx}/>
                </Modal>
              </div>

              <ReactPaginate
                className="board_paginate"
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"boardPageNationBtns"}
                previousClassName={"prevBtn"}
                nextLinkClassName={"nextBtn"}
                disabledClassName={"pageNationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>

            {Owner ? (
            <div className="board_btns">              
              <button onClick={ openModal }>
                등록
              </button>
              <ModalUpdate open={ modalOpen } close={ closeModal } header="게시판 업로드">
                <BoardUpload/>
              </ModalUpdate>
              {/* <input type="text" className="serchbar"placeholder="검색"/>

              <button>
                검색
              </button> */}
            </div>
          ) : (
            <div>
              {/* <input type="text" className="searchInput"placeholder="검색"/>
              <button>검색</button> */}
            </div>
          )}
            
            

          </div>
        </div>
      </div>

      <div className='users_image_container'>        
        {displayImage}
      </div>
      <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  pageCount={pageCount2}
                  onPageChange={changePage2}
                  containerClassName={"pageNationBtns"}
                  previousClassName={"prevBtn"}
                  nextLinkClassName={"nextBtn"}
                  disabledClassName={"pageNationDisabled"}
                  activeClassName={"paginationActive"}
          />
    </div>
  )
}

export default Users_page
