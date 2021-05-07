import React from 'react'
import './Recomended.css'

import VideoCard from './VideoCard'

function Recomended() {
  return (    
    <div className="recomended_videos">
        <VideoCard        
          image='https://blog.kakaocdn.net/dn/bCbtjH/btqFK2DlCMD/8kiHXjZgf05BG242uk8bs1/img.jpg'
        />
        <VideoCard        
          image='https://cdn.kado.net/news/photo/202004/1018454_448598_1539.jpg'
        />
        <VideoCard        
          image='https://blog.kakaocdn.net/dn/bCbtjH/btqFK2DlCMD/8kiHXjZgf05BG242uk8bs1/img.jpg'
        />
        <VideoCard        
          image='https://cdn.kado.net/news/photo/202004/1018454_448598_1539.jpg'
        />      
      </div>

  )
}

export default Recomended
