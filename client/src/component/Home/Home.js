import React from 'react';
import './Home.css'

// import Recomended from './Recomend/Recomended'
import Recently from './Recently/Recently'
import Banner from './Banner/Banner'



function Home() {  

  return (
    <div className='home'>
      <Banner className='banner'/>

      <div className="recently_text_container">
        <div className="recently_text">
          
        </div>
      </div>
      
      <Recently className='recently'/>
      
      {/* <div className="recomended_text_container">
        <div className="recomended_text">
          
        </div>
      </div>
      <Recomended className='recomended'/> */}
    </div>
  )
}

export default Home
