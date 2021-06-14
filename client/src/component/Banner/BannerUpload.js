import React, { useState, useRef, useEffect } from 'react'
import './BannerUpload.css'
import Axios from 'axios'

function BannerUpload() {
  
  const id= sessionStorage.getItem('id')
  
  const [File, setFile] = useState('')
  const [FileName, setFileName] = useState('')

  const [Image, setImage] = useState()
  const [Preview, setPreview] = useState()
  const fileInputRef = useRef()

  useEffect(() => {
    if (Image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(Image)
    } else {
      setPreview(null)
    }
  }, [Image])

  const onChange = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)

    const file = e.target.files[0]
      if(file) {
        setImage(file)
      } else {
        setImage(null)
      }
  }

  const onSubmit = async e => {
    
    const formData = new FormData()
    formData.append('image', File)
      
    Axios.post('https://api.25toillet.xyz/images/bannerUpload',formData, {  
      params: {
        users_id: id
      }       
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    ).then((response) => {
      console.log(response.data.result)      
        Axios.post('https://api.25toillet.xyz/images/banner',
          {
            banner_image_path: response.data.result,
            users_id: id
          }
        )
        alert("Upload Success")
        window.location.pathname = '/'      
    }).catch((err) => {
      alert(err.response.data) 
    })
  }



  return (
    <div className="banner_UploadPage">
      <div className="banner_SelectFileContainer">
        <div className="banner_top">
        </div>

        <div className="banner_body" id="Selected" >
          <div className="banner_imageSelect" >
            <form className="banner_img_select_form">
              {Preview ? (
                  <img 
                    className="banner_img_select_pic"
                    src={Preview} 
                    alt=""
                    onClick={(e) => {
                      e.preventDefault()
                      fileInputRef.current.click()
                    }}
                  />
              ) : (
              <button className="banner_img_select_button"
                onClick={(e) => {
                  e.preventDefault()
                  fileInputRef.current.click()
                }}
              >select image
              </button>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={onChange} 
                accept="image/*"
                style={{ display: "none"}}
              />
              <label htmlFor="cutfomFile">{FileName}</label>
            </form>
          </div>
          
          <div className="banner_uploadForm"> 
            <div className="banner_upload_bttn">
              <button 
                className="banner_image_upload_bttn"
                onClick={onSubmit}
              >Upload</button>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default BannerUpload
