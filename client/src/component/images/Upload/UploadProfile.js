import React, { useState, useRef, useEffect } from 'react'
import './UploadProfile.css'
import Axios from 'axios'

function UploadProfile() {
  
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
      
    Axios.post('https://api.25toillet.xyz/images/profileUpload',formData, {  
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
        Axios.post('https://api.25toillet.xyz/profile',
          {
            profile_path: response.data.result,
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
    <div className="UploadPage">
      <div className="SelectFileContainer">
        <div className="top">
        </div>

        <div className="body" id="Selected" >
          <div className="imageSelect" >
            <form className="img_select_form">
              {Preview ? (
                  <img 
                    className="img_select_pic"
                    src={Preview} 
                    alt=""
                    onClick={(e) => {
                      e.preventDefault()
                      fileInputRef.current.click()
                    }}
                  />
              ) : (
              <button className="img_select_button"
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
          
          <div className="uploadForm"> 
            <div className="upload_bttn">
              <button 
                className="image_upload_bttn"
                onClick={onSubmit}
              >Upload</button>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default UploadProfile
