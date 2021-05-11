import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Recently.css'
import ReactPaginate from 'react-paginate'

function Recently() {

  const [Recently, setRecently] = useState([].slice(0,25))  
  const [pageNumber, setpageNumber] = useState(0)

  

  useEffect(() => {
    Axios.get('http://localhost:3000/images/recently')
    .then((response) => {
      console.log(response)
      setRecently(response.data.result)      
    })
  }, [])

  const imagesPerPage = 12
  const pagesVisited = pageNumber * imagesPerPage
  const pageCount = Math.ceil(Recently.length / imagesPerPage)
  const displayImage = Recently
    .slice(pagesVisited, pagesVisited + imagesPerPage)
    .map((value) => {return <div className='image_card' > 
      <img alt='' src={value.images_path} className="image_card_img"/>
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
