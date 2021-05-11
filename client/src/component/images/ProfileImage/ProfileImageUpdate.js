import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import ReactPaginate from 'react-paginate'
import './ProfileImageUpdate.css'


function ProfileImageUpdate() {
  const [ProfileImage, setProfileImage] = useState('')
  const id = sessionStorage.getItem('id')
  const [UserImages, setUserImages] = useState([].slice(0,25))
  const [pageNumber2, setpageNumber2] = useState(0)

  const [newProfileImage, setnewProfileImage] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:3000/users',{
          params: {
            users_id: id
          }
        }
      )
    .then((response) => {
      if(response.data.result.profile) {
        setProfileImage(response.data.result.profile)
      } else {
        setProfileImage('/images/admin/emptyProfile.jpg')
      }   
    })
  }, [id])

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

const ChangeMainImage = () => {
  Axios.put('http://localhost:3000/users', {
    users_id: id,
    profile: newProfileImage
  }).then(
    window.location.pathname = `/users_page/${id}`,
  )
}

  const imagePerPage = 5
  const pagesVisited2 = pageNumber2 * imagePerPage
  const pageCount2 = Math.ceil(UserImages.length / imagePerPage)
  const displayImage = UserImages
                        .slice(pagesVisited2, pagesVisited2 + imagePerPage)
                        .map((value) => {
                          return <div 
                          className='MainImageUpdate_imageCard' 
                          key={value.images_idx} 
                          id={value.users_id}
                          onClick={ChangeMainImage}
                          >
                          <div>
                            <img 
                              alt='' 
                              src={`http://localhost:3000/${value.images_path}`} 
                              onMouseUp={()=>{
                                setnewProfileImage(value.images_path)
                              }
                              }
                            />
                          <div className="images_name">
                            {value.images_title}
                          </div>
                          </div>
                        </div>
                        })

  const changePage2 = ({selected}) => {
    setpageNumber2(selected)
  }


  return (
    <div className="MainImageUpdate_container">
      <div className="PrevMainImage_container">
        <img alt='' src={`http://localhost:3000/${ProfileImage}`}/>
      </div>
      <div className="MainImageUpdate_text">
        프로필 이미지로 변경하실 이미지를 클릭 해 주세요.
      </div>
      <div className="MainImageUpdate_imageCard_container">
        <div className='MainImageUpdate_imageCard'>        
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
    </div>
  )
}

export default ProfileImageUpdate

