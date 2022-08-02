import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {

    const { user, logout } = useAuth();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();


    const handleLogout = async(e:React.FormEvent) => {
        e.preventDefault();

        try {
            setError('');
            
            await logout();
            navigate('/');
        } catch (e:any) {
            setError(e.message);
        }
    }

    // console.log(user);
    

    return (
        <div className='flex item-center justify-between p-4 z-[100] absolute w-full'>
            <Link to='/'>
                <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>NETFLIX</h1>
            </Link>
            {user?.email ? 
            <div>
                <Link to='/account'>
                    <button className='text-white pr-4'>Account</button>
                </Link>
                <button onClick={handleLogout}
                className='bg-red-600 px-6 py-2 rounded' >Logout</button>
            </div> :
            <div>
                <Link to='/signin'>
                    <button className='text-white pr-4'>Sign In</button>
                </Link>
                <Link to='/signup'>
                    <button className='bg-red-600 px-6 py-2 rounded' >Sign Up</button>
                </Link>
            </div>  
            }
            
        </div>
    );
}

export default Navbar;

