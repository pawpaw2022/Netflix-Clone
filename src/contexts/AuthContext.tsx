import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 



const AuthContext = React.createContext<any>(null);

export function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children } : any) {

    const [user, setUser] = useState<any>(null);
    
    function signup(email:string, password:string) {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, 'users', email), {
            savedMovies: []
        })
    }
 
    function login(email:string, password:string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
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
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;