import React,{useEffect, useState} from 'react'
import {API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {
    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([])

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
        .then(response => response.json())
        .then(data => {                    
            setMovie(data);
        })
    }, [])

    return (
        <div>
            {/** heaer */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                title={Movie.origin_title}
                text={Movie.overview}            
            />

            {/** body */}
            <div style={{ width:'85%', margin:'1rem auto'}}>

                {/** movie info */}
                <MovieInfo movie={Movie}/>

                <br />
                {/** actors grid */}
                <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}> 
                    <button> Toggle Actors view</button>
                </div>

            </div>
        </div>
    )
}

export default MovieDetail
