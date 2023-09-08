import { useState, useEffect, createContext } from "react";
//firebase imports
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//custom components
import {auth} from "../auth/firebase"
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/ToastNotify"


//getting Context from AuthContext
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [displayName, setDisplayName] = useState("")
    const navigate = useNavigate()

    //local storage saving
    // useEffect(() => {
    //     if (currentUser) {
    //         localStorage.setItem('currentUser', JSON.stringify(currentUser));
    //     }
    //     else {
    //         localStorage.removeItem("currentUser");
    //     }
    // }, [currentUser]);

    //creting user
    const createUser = async (email, password, displayName) => {
        try {
            //let userCredential = 
            await createUserWithEmailAndPassword(auth, email, password)
            // console.log(userCredential)
            await updateProfile(auth.currentUser, { displayName })
            toastSuccessNotify("Account Created Successfully!!!")
            navigate("/")
        }
        catch (err) {
            toastErrorNotify(err.message)
        }
    }
    //Google Authantication
    const signUpProvider = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then((res) => {
                // console.log(res)
                navigate("/")
                toastSuccessNotify("Account Created Successfully!!!")
            })
            .catch((err) => {
                toastErrorNotify(err.message)
            })
    }
    //logging out
    const logOut = () => {
        signOut(auth)
        navigate("/")
        toastSuccessNotify("Logged Out")
    }
    //logging in
    const signIn = async (email, password) => {
        try {
            //let userCredential = 
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
            toastSuccessNotify("Successfully Logged In!")
            // console.log(userCredential)
        } catch (err) {
            toastErrorNotify(err.message)
        }
    }

    const userObserver = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { email, displayName } = user
                setCurrentUser({ email, displayName })
            } else {
                setCurrentUser(false)
                // console.log("No user or user signed out.")
            }
        })
    }

    useEffect(() => {
        userObserver()
    }, [])

    const values = {
        createUser,
        currentUser,
        logOut,
        signIn,
        signUpProvider,
        displayName,
        setDisplayName,
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;