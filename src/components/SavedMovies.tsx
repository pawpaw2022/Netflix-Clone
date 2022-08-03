import React, { useEffect, useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { useAuth } from '../contexts/AuthContext';
import { onSnapshot, doc, updateDoc} from 'firebase/firestore';
import { db } from '../firebase';


function SavedMovies() {

    const [movies, setMovies] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const { user } = useAuth();


    useEffect(()=>{
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedMovies);
        })
    },[user?.email])
    


    const movieId = doc(db, 'users', `${user?.email}`);
    const handleDelete = async (id: number) => { 

        try {
            setError('')
            const filtered = movies.filter((item) => item.id !== id)
            await updateDoc(movieId, { savedMovies: filtered });
            setMovies(filtered);    
        } catch (e:any) {
            setError(e.message)
        }
        
    }

    return (
        <>
        <h2 className="text-white font-bold md:text-xl p-4 mt-3">My List</h2>
        <div className="relative flex items-center mx-2">

            
            <div id={'slider'} className='w-full h-full relative'>
                {movies.map((item, id) => {
                    return <div key={id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                        <img
                            className='w-full h-auto block' 
                            src={item ? `https://image.tmdb.org/t/p/w500/${item.img}` : ""}
                            alt={item?.title} />
                        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                            <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                                {item?.title}
                            </p>
                            <p onClick={()=> handleDelete(item.id)} className='absolute text-gray-300 top-3 right-3'>
                                <IoCloseCircleOutline size='30px' />
                            </p>
                        </div>
                    </div>
                })}
            </div>
            


        </div>
        </>
    );
}

export default SavedMovies;