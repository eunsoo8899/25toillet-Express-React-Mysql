import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import ReactPaginate from 'react-paginate'
import './BannerUpdate.css'

function BannerUpdate() {
  const [Banner, setBanner] = useState('')
  const id = sessionStorage.getItem('id')
  const [UserImages, setUserImages] = useState([].slice(0,25))
  const [pageNumber2, setpageNumber2] = useState(0)

  const [newBanner, setnewBanner] = useState('')

  useEffect(() => {
    Axios.get('https://api.25toillet.xyz/users',{
          params: {
            users_id: id
          }
        }
      )
    .then((response) => {
      if(response.data.result.banner) {
        setBanner(`https://api.25toillet.xyz/${response.data.result.banner}`)
        // console.log(response)
      } else {
        setBanner('https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg')
        // console.log(response)
      }
    })
  }, [id])

  useEffect(() => {
    Axios.get('https://api.25toillet.xyz/images/banner',{
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

const ChangeBanner = () => {
  Axios.put('https://api.25toillet.xyz/users', {
    users_id: id,
    banner: newBanner
  }).then((response) => {
    alert(response.data)
    window.location.pathname = `/`
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
                          className='BannerUpdate_imageCard' 
                          key={value.banner_idx}
                          onClick={ChangeBanner}
                          >
                          <div>
                            <img 
                              alt='' 
                              src={`https://api.25toillet.xyz/${value.banner_image_path}`} 
                              onMouseUp={()=>{
                                setnewBanner(value.banner_image_path)
                              }
                              }
                            />
                          </div>
                        </div>
                        })

  const changePage2 = ({selected}) => {
    setpageNumber2(selected)
  }


  return (
    <div className="MainImageUpdate_container">
      <div className="banner_PrevMainImage_container">
        <img alt='' src={Banner}/>
      </div>
      <div className="MainImageUpdate_text">
        배너 이미지로 변경하실 이미지를 클릭 해 주세요.
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

export default BannerUpdate
