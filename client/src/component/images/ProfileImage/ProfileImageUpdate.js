import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import ReactPaginate from 'react-paginate'
import './ProfileImageUpdate.css'


function ProfileImageUpdate() {
  const [ProfileImage, setProfileImage] = useState('')
  const id = sessionStorage.getItem('id')
  const [ProfileImages, setProfileImages] = useState([].slice(0,25))
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
    Axios.get('http://localhost:3000/profile',{
      params: {
        users_id: id
      }
    }
  )
.then((response) => {
  console.log(response)      
  setProfileImages(response.data.result)
})
}, [id])

const ChangeProfileImage = () => {
  Axios.put('http://localhost:3000/users', {
    users_id: id,
    profile: newProfileImage
  }).then((response) => {
    alert(response.data)
    window.location.pathname = '/'
  })
}

  const imagePerPage = 5
  const pagesVisited2 = pageNumber2 * imagePerPage
  const pageCount2 = Math.ceil(ProfileImages.length / imagePerPage)
  const displayImage = ProfileImages
                        .slice(pagesVisited2, pagesVisited2 + imagePerPage)
                        .map((value) => {
                          return <div 
                          className='MainImageUpdate_imageCard' 
                          key={value.profile_idx} 
                          id={value.users_id}
                          onClick={ChangeProfileImage}
                          >
                          <div>
                            <img 
                              alt='' 
                              src={`http://localhost:3000/${value.profile_path}`} 
                              onMouseUp={()=>{
                                setnewProfileImage(value.profile_path)
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

