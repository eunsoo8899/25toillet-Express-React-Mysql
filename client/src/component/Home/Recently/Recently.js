import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Recently.css'
import ReactPaginate from 'react-paginate'
import ModalImage from '../../Modal/ModalImage'
import DetailImage from '../../images/DetailImage'

function Recently() {

  const [Recently, setRecently] = useState([].slice(0,25))  
  const [pageNumber, setpageNumber] = useState(0)

  const [ImagesIdx, setImagesIdx] = useState('')
  const [ImagesTitle, setImagesTitle] = useState('')
  

  useEffect(() => {
    Axios.get('https://api.25toillet.xyz/images/recently')
    .then((response) => {
      console.log(response)
      setRecently(response.data.result)      
    })
  }, [])

  // image detail Modal
  const [ modalOpen, setModalOpen ] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }

  const imagesPerPage = 12
  const pagesVisited = pageNumber * imagesPerPage
  const pageCount = Math.ceil(Recently.length / imagesPerPage)
  const displayImage = Recently
    .slice(pagesVisited, pagesVisited + imagesPerPage)
    .map((value) => {return <div className='image_card' key={value.images_idx} > 
      <img 
        alt='' 
        src={`https://api.25toillet.xyz/${value.images_path}`}
        className="image_card_img"
        onMouseUp={() => {
          setImagesIdx(value.images_idx)
          setImagesTitle(value.images_title)
        }}
        onClick={ openModal }
      />
      <div className="image_card_title">{value.images_title}</div>
      <a 
        href={`/users_page/${value.users_id}`} 
        key={value.images_idx} 
        id={value.users_id}
        className="image_card_usersID_link"
      >
        <div className="image_card_usersID">{value.users_id}</div>
      </a>
    </div>
    })

  const changePage = ({selected}) => {
    setpageNumber(selected)
  }

  return (
    <div className='recently_container'> 
      <div className="displayImage">  
        {displayImage}
        <ModalImage open={ modalOpen } close={ closeModal } header={ImagesTitle} >
          <DetailImage 
            images_idx={ImagesIdx}
          />
        </ModalImage>
      </div>
      <div>
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
    </div>
  )
}

export default Recently
