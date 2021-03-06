import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import ReactPaginate from 'react-paginate'
import './MainImageUpdate.css'

function MainImageUpdate() {
  const [MainImage, setMainImage] = useState('')
  const id = sessionStorage.getItem('id')
  const [UserImages, setUserImages] = useState([].slice(0,25))
  const [pageNumber2, setpageNumber2] = useState(0)

  const [newMainImage, setnewMainImage] = useState('')

  useEffect(() => {
    Axios.get('https://api.25toillet.xyz/users',{
          params: {
            users_id: id
          }
        }
      )
    .then((response) => {
      if(response.data.result.main_image) {
        setMainImage(`https://api.25toillet.xyz/${response.data.result.main_image}`)
        // console.log(response)
      } else {
        setMainImage('https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg')
        // console.log(response)
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
    main_image: newMainImage
  }).then((response) => {
    alert(response.data)
    // console.log(response)
    window.location.pathname = `/users_page/${id}`
  }).catch((err) => {
    alert(err)

  }) 
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
                                setnewMainImage(value.images_path)
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
        <img alt='' src={MainImage}/>
      </div>
      <div className="MainImageUpdate_text">
        ?????? ???????????? ???????????? ???????????? ?????? ??? ?????????.
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

export default MainImageUpdate
