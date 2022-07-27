import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from "react-icons/io5";

interface IRow {
    title: string;
    fetchURL: string;
    rowId: number;
}

function Row({ title, fetchURL, rowId } : IRow) {

    const [movies, setMovies] = useState<any[]>([]);

    useEffect(()=>{
        loadMovies();
    }, [fetchURL])

    const loadMovies = async () => {
        const response = await(axios.get(fetchURL));
        setMovies(response.data.results.slice(0,10));
    }

    const scrollLeft = () => {
        const slider = document.getElementById('slider'+rowId);
        if (!slider) return 
        slider!.scrollLeft = slider!.scrollLeft - 500;
    }

    const scrollRight = () => {
        const slider = document.getElementById('slider'+rowId);
        if (!slider) return 
        slider!.scrollLeft = slider!.scrollLeft + 500;
    }
    
    

    return (
        <>
        <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
        <div className="relative flex items-center group">

            <IoChevronBackCircleSharp size="50px"
                onClick={scrollLeft}
                className='bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden'/>

            <div id={'slider'+rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                {movies.map((item:any, id: number) : any => {
                    return <Movie key={id} item={item} />
                })}
            </div>
            <IoChevronForwardCircleSharp size="50px"
                onClick={scrollRight}
                className='bg-white rounded-full absolute right-1 opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden'/>

        </div>
        </>
    );
}

export default Row;