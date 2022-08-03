import React, { useEffect, useState } from 'react';
import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from "react-icons/io5";
import { useAuth } from '../contexts/AuthContext';
import { onSnapshot, doc} from 'firebase/firestore';
import { db } from '../firebase';


function SavedMovies() {

    const [movies, setMovies] = useState<any[]>([]);
    const { user } = useAuth();

    const scrollLeft = () => {
        const slider = document.getElementById('slider');
        if (!slider) return 
        slider!.scrollLeft = slider!.scrollLeft - 500;
    }

    const scrollRight = () => {
        const slider = document.getElementById('slider');
        if (!slider) return 
        slider!.scrollLeft = slider!.scrollLeft + 500;
    }

    useEffect(()=>{
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedMovies);
        })
    },[user?.email])
    
    

    return (
        <>
        <h2 className="text-white font-bold md:text-xl p-4 mt-3">My List</h2>
        <div className="relative flex items-center">

            <IoChevronBackCircleSharp size="50px"
                onClick={scrollLeft}
                className='bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden'/>
            
            {movies.map((item, id) => {
                return <div key={id} id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                        <img
                            className='w-full h-auto block' 
                            src={item ? `https://image.tmdb.org/t/p/w500/${item.img}` : ""}
                            alt={item?.title} />
                        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                            <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                                {item?.title}
                            </p>
                        </div>
                    </div>
                </div>
            })}

            <IoChevronForwardCircleSharp size="50px"
                onClick={scrollRight}
                className='bg-white rounded-full absolute right-1 opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden'/>

        </div>
        </>
    );
}

export default SavedMovies;