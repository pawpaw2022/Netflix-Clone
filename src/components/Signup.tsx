import { async } from '@firebase/util';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Signup() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { user, signup } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            
            await signup(email, password);
            navigate('/');
        } catch (e:any) {
            setError(e.message);
            console.log(e.message);
            
        }
        setLoading(false);
    }

 

    return (
        <>
        <img 
        className='hidden sm:block absolute w-full h-full object-cover'
        src="https://assets.nflxext.com/ffe/siteui/vlv3/c2578c37-8569-4f88-b8f1-67a26a9ddcdd/42ea8793-7b9b-4ac5-9676-5042e39c0029/US-en-20220725-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
        alt="/bg-img" />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>

        <div className='fixed w-full px-4 py-24 z-50'>
            
            <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                <div className="max-w-[320px] mx-auto py-16">
                    <h1 className='text-3xl font-bold'>Sign Up</h1>
                    <form className='w-full flex flex-col py-4' onSubmit={handleSubmit}>
                        <input onChange={e => {setEmail(e.currentTarget.value)}} className='p-3 my-2 bg-gray-700 rounded' type="email" placeholder='Email' />
                        <input onChange={e => {setPassword(e.currentTarget.value)}} className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='Password' />
                        <button disabled={loading} className='bg-red-600 py-3 my-6 rounded font-bold hover:bg-red-800 ' >Sign Up</button>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <p>
                                <input className='mr-2' type="checkbox" />
                                Remember me
                            </p>
                            <p>Need Help?</p>
                        </div>
                        <p className='py-5'>
                            <span className="text-gray-800 mr-2">
                                Already subscribed to Netflix?
                            </span>
                            <Link to='/signin'>
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

        </div>
        </>
    );
}

export default Signup;