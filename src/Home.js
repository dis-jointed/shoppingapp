import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
    return (
        <div className='home'>

        <div className='menu__buttons'>

        <button className='brand__btn' variant="contained">
                Brands
        </button>

        <Link to='/shoes'>
        <button className='menu__btn' variant="contained">
                Menu
        </button>
        </Link>

        <button className='search__btn' variant="contained">
                Search
        </button>
        </div>
       


           <img src='https://fanart.tv/fanart/movies/380808/hdmovielogo/zero-days-5775d3e150da0.png' /> 




        </div>
    )
}

export default Home
