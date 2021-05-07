import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'

function Search() {
  const [inputSearch, setinputSearch] = useState('')
  return (
    <div className="header_input">
        <input 
          onChange={ e=> setinputSearch(e.target.value)}
          value={inputSearch}
          type='text'
          placeholder='Search'
        />
        <Link to={`/search/${inputSearch}`}>
          <SearchIcon className='header_input_button'/>        
        </Link>
      </div>
  )
}

export default Search
