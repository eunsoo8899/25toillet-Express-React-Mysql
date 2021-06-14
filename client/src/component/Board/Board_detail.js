import React,{useState, useEffect} from 'react'
import Axios from 'axios'

function Board_detail(props) {
  const {boardIdx} = props
  const [BoardContent, setBoardContent] = useState('')

  useEffect(() => {
    Axios.get('https://api.25toillet.xyz/board/content',{
          params: {
            board_idx: boardIdx
          }
        }
      )
    .then((response) => { 
      setBoardContent(response.data.result[0].board_content)
      console.log(response)
    })
  }, [boardIdx])

  return (
    <div>
      {BoardContent}
    </div>
  )
}

export default Board_detail
