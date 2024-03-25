import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, firestore, storage } from '../Firebase/firebase';

const useSearchUser = () => {

    const showToast = useShowToast()
    const [isUpdatingSearch, setIsUpdatingSearch] = useState(false)
    const [userSearched, setUserSearched] = useState(null)

    const getProfile = async(username) => {
        setIsUpdatingSearch(true)
        try{
            const userProfileRef = collection(firestore, "users")
            const q =query(userProfileRef,where("username","==",username))
            const querySnapshot = await getDocs(q);

            if(querySnapshot.empty){
                showToast("Error","User does not exist","error")
                setUserSearched(null)
                setIsUpdatingSearch(false)
                return
            }
            let userDoc
            querySnapshot.forEach(userDocument => {
                userDoc = userDocument.data();
            });
            setUserSearched(userDoc)

        }
        catch(error)
        {
            showToast("Error",error.message,"error")
        }
        finally{
            setIsUpdatingSearch(false)
        }
    }
    return {isUpdatingSearch, userSearched, getProfile, setUserSearched}
}

export default useSearchUser