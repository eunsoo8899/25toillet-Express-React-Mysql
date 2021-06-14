import React,{useState, useEffect} from 'react'
import Axios from 'axios'
import './DetailImage.css'

function DetailImage(props) {
  const {images_idx} = props
  const [ImagesPath, setImagesPath] = useState('')
  const [Title, setTitle] = useState('')
  const [Des, setDes] = useState('')
  const [UserID, setUserID] = useState()

  useEffect(() => {
    Axios.get('https://api.25toillet.xyz/images/detail',{
          params: {
            images_idx: images_idx
          }
        }
      )
    .then((response) => { 
      console.log(response.data.result[0])
      setImagesPath(response.data.result[0].images_path)
      setTitle(response.data.result[0].images_title)
      setDes(response.data.result[0].images_description)
      setUserID(response.data.result[0].users_id)
    })
  }, [images_idx])

  return (
    <div className="Detail_container">

      <div className="image_container">
        <img src={`https://api.25toillet.xyz/${ImagesPath}`} alt="" 
          className="detail_image"
        />
      </div>

      <div className="text_container">
        <h5 className="user_id">
          ID : {UserID}
        </h5>
        <h3 className="title">
          Title : {Title}
        </h3>
        <div className="des">
          {Des}
        </div>
      </div>
    </div>
  )
}

export default DetailImage
