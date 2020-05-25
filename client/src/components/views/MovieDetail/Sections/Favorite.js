import React, { useState, useEffect } from 'react'
import Axios from 'axios'

function Favorite(props) {

    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [FavoriteToggle, setFavoriteToggle] = useState(false)
    useEffect(() => {
        
        let variables = {
            userFrom : props.userFrom,
            movieId : props.movieId            
        }

        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data);
                setFavoriteNumber(response.data.favoriteNumber);
            }else {
                alert('즐겨찾기 정보 가져오기 실패')
            }
        })
        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data);
                setFavoriteToggle(response.data.favorited);
            }else {
                alert('즐겨찾기 정보 가져오기 실패')
            }
        })

    }, [])

    const handleOnclick = () => {
        let variables = {
            userFrom : props.userFrom,
            movieId : props.movieId,
            movieTitle,
            moviePost,
            movieRunTime
        }

        // 내가 누른 상태냐? 아니냐?
        if(!FavoriteToggle) {
            Axios.post('/api/favorite/add', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data);
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavoriteToggle(true)
                }else {
                    alert('즐겨찾기 추가 실패')
                }
            })
        } else {
            Axios.post('/api/favorite/delete', variables)
            .then(response => {
                if(response.data.success) {                    
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavoriteToggle(false)
                }else {
                    alert('즐겨찾기 삭제 실패')
                }
            })
        }
        
    }

    return (
        <div>
            <button onClick={handleOnclick}>
            {FavoriteToggle ? 'Favorited' : 'Not Favorited'} {FavoriteNumber}
            </button>
        </div>
    )
}

export default Favorite
