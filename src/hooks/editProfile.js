import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, setDoc, updateDoc, where, doc } from 'firebase/firestore';
import { auth, firestore, storage } from '../Firebase/firebase';
import useAuthStore from '../store/authStore';
import useProfileStore from '../store/userProfileStore'

const editProfile = () => {

    const userLoggedIn = useAuthStore(state => state.userLoggedIn)
    const userLogin = useAuthStore(state=> state.login)
    const setUserProfile = useProfileStore(state => state.setUserProfile)
    const showToast = useShowToast()
    const [isUpdating, setIsUpdating] = useState(false)
    const submitEdit = async(inputs) =>{
        if(!userLoggedIn){
            return
        }
        setIsUpdating(true)
        const newProfileData = {
            ...userLoggedIn,
            name:inputs.name,
            username:inputs.username,
            bio:inputs.bio,
        }
        try{
            (await updateDoc(doc(firestore, "users", userLoggedIn.uid), newProfileData));
            localStorage.setItem("user-info",JSON.stringify(newProfileData));
            userLogin(newProfileData)
            setUserProfile(newProfileData)
            showToast("Profile Updated","You have succesfully updated your profile!","success")
        }
        catch(error){
            console.log(error)
            return
        }
        finally{
            setIsUpdating(false)
        }
    }
    return {isUpdating, submitEdit}
}

export default editProfile