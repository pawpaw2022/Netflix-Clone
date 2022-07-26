import axios from 'axios';
import React, { useEffect, useState } from 'react';
import requests from '../Request';

function Home() { 

    const [movies, setMovies] = useState<any[]>([]);


    const movie = movies[Math.floor(Math.random() * movies.length)]

    useEffect(()=>{
        loadMovies();
    }, [])

    const loadMovies = async () => {
        const response = await(axios.get(requests.requestPopular));
        setMovies(response.data.results);
    }

    const truncateText = (str:string, num: number): string => {
        if (str?.length < num) return str

        return str?.slice(0,num) + "..."
    }
    
    // console.log(movie);
    
    

    return (
        <div className="w-full h-[550px] text-white">
            <div className="w-full h-full">
                {/* Shadow Gradient */}
                <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
                {/* Movie Image */}
                <img
                src={movie ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : ""}
                alt={movie?.title}
                className="w-full h-full object-cover" />
                {/* Movie Details */}
                <div className="absolute w-full top-[20%] p-4 md:p-8">
                    <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
                    <div className="my-4">
                        <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
                            Play
                        </button>
                        <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
                            Watch Later
                        </button>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Released: {movie?.release_date}
                    </p>
                    <p className="w-full md:max-w-[70%] kg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                       {truncateText(movie?.overview, 200)}
                    </p>


                </div>

            </div>
        </div>
    );
}

export default Home;