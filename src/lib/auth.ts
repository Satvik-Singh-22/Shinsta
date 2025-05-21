import {auth} from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithEmailLink,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

export const register = async (email: string, password: string) =>{
    return (await createUserWithEmailAndPassword(auth,email, password)).user;
}

export const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const logout =  async () => {
    return await signOut(auth);
}

export const listenAuthChanges = async (callback: (user: any )=> void) =>{
    return onAuthStateChanged(auth, callback)
}
