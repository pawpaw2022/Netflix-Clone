import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';


const AuthContext = React.createContext<any>(null);

export function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children } : any) {

    const [user, setUser] = useState<any>(null);
    
    function signup(email:string, password:string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
 
    function login(email:string, password:string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(email:string, password:string) {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);            
        })

        return unsubscribe;
    }, [user])

    const value = {
        user, 
        signup,
        login,
        signOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;