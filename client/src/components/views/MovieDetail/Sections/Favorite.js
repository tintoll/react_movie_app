import React, { useState, useEffect } from 'react'
import Axios from 'axios'

function Favorite(props) {

    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
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
    }, [])

    return (
        <div>
            <button>Favorite {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
