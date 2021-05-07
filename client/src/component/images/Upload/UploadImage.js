import React, {useState} from 'react'
import Axios from 'axios'

function UploadImage() {

  const [File, setFile] = useState('')
  const [FileName, setFileName] = useState('Choose File')
  const id = sessionStorage.getItem('id')

  const onChange = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  const onSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', File)
      
    Axios.post('http://localhost:3000//images/upload',formData, {  
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
    }).catch((err) => {
      if(err.response.status === 500) {
        console.log('There was a problem')
      } else {
        console.log(err.response.data.result)
      }
    })
  }



  return (
    <div>    
      <div>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={onChange} />
          <label htmlFor="cutfomFile">{FileName}</label>
          <input type="submit" value="Upload"/>
        </form>
      </div>

    </div>
  )
}

export default UploadImage
