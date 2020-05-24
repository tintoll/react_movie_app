import React , {useEffect, useState} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'
import {Row} from 'antd'

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetchMovies(endpoint)


    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setMovies([...Movies,...data.results]);
            setMainMovieImage(data.results[0]);
            setCurrentPage(data.page)
        } );
    }

    const loadMovieItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage}`;
        fetchMovies(endpoint)
    }

    return (
        <div style={{ width:'100%', margin :0}}>

            {/* Main Image*/}
            {
                MainMovieImage &&
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                    title={MainMovieImage.origin_title}
                    text={MainMovieImage.overview}
                />
            }
            

            <div style={{ width:'85%', maring:'1rem auto'}}>
                <h2>Movide by latest</h2>
                <hr />

                {/* Grid Card */}
                <Row gutter={[16,16]}>
                {
                    Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null
                                }
                                movieId={movie.id}
                                movideName={movie.original_title}
                            />
                        </React.Fragment>
                    ))
                }
                </Row>
                 
            </div>
            <br />
            <div style={{ display : 'flex', justifyContent : 'center'}}>
                <button onClick={loadMovieItems}>load more</button>
            </div>
       
        </div>
    )
}

export default LandingPage
