import React from 'react'

import './VideoCard.css'

function VideoCard({ image }) {

  return (
    <div className="video">
      <div className='videoCard'>
        <img className='videoCard_thumbnail' src={image} alt=""/>      
      </div>
    </div>
  )
}

export default VideoCard
