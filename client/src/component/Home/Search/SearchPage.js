import React from 'react'
import './SearchPage.css'
import ChannelRow from './ChannelRow'
import VideoRow from './VideoRow'
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined'

function SearchPage() {
  return (
    <div className="searchPage">
      <div className="searchPage_filter">
        <TuneOutlinedIcon/>
        <h2>Filter</h2>
      </div>
      <hr/>

      <ChannelRow 
        image='https://blog.kakaocdn.net/dn/bCbtjH/btqFK2DlCMD/8kiHXjZgf05BG242uk8bs1/img.jpg'
        channel='gal'
        verified
        subs='112K'
        noOfVideos={399}
        description='you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!you can do it!'
      />
      <hr/>
      <br/>
      <VideoRow 
        image='https://blog.kakaocdn.net/dn/bCbtjH/btqFK2DlCMD/8kiHXjZgf05BG242uk8bs1/img.jpg'
        views='1.4M'
        subs='443K'
        description='descriptiondescriptiondescriptiondescription'
        timestamp='10 min ago'
        channel='gagagaga'
        title='titletitletitletitletitletitle'
      />
    </div>
  )
}

export default SearchPage
