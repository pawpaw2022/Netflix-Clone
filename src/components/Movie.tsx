import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { IoAddCircleOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

interface IMovie{
    item: any;
    key: number;
}

function Movie({item} : IMovie ) {

    const [like, setLike] = useState<boolean>(false);
    const { user } = useAuth();
    const navigate = useNavigate();


    const movieId = doc(db, 'users', `${user?.email}`);


    useEffect(()=>{
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            const savedMovies:any[] = (doc.data()?.savedMovies); 
            
            if (!savedMovies) return 

            for(let movie of savedMovies){
                if (movie.id === item.id){
                    setLike(true)
                }
            }
        })
    }, [user])

    
    const handleSave = async () => {
        if (user?.email){
            // user has logged in
            setLike(!like);
            
            if (!like) { 
                await updateDoc(movieId, {
                    savedMovies: arrayUnion({
                        id: item.id,
                        title: item.title, 
                        img: item.backdrop_path
                    })
                })
                
            }else{ // unsave a movie
                await updateDoc(movieId, {
                    savedMovies: arrayRemove({
                        id: item.id,
                        title: item.title, 
                        img: item.backdrop_path
                    })
                })
            }

        }else{
            alert('Please log in to save a movie.');
        }
    }


    

    return (
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
            <img
                className='w-full h-auto block' 
                src={item ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}` : ""}
                alt={item?.title} />
            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {item?.title}
                </p>
                <p onClick={handleSave}>
                    {like ? 
                    <IoCheckmarkCircleSharp className='absolute top-4 left-4' size='30px' /> : 
                    <IoAddCircleOutline className='absolute top-4 left-4 text-m' size='30px'/>}
                </p>
            </div>
        </div>
    );
}

export default Movie;