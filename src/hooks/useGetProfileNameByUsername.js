import { useEffect, useState } from "react";
import useProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, firestore, storage } from '../firebase/firebase';

const useGetProfileNameByUsername = ({username}) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const {setUserProfile, userProfile} = useProfileStore()
    useEffect(() => {
        const getUserProfile = async() => {
            try{
                const userProfileRef = collection(firestore, "users")
                const q =query(userProfileRef,where("username","==",username))
                const querySnapshot = await getDocs(q);

                if(querySnapshot.empty){
                    showToast("Error","User does not exist","error")
                    setIsLoading(false)
                    setUserProfile(null)
                    return
                }

                let userDoc
                querySnapshot.forEach(userDocument => {
                    userDoc = userDocument.data();
                    console.log(userDoc)
                });
                setUserProfile(userDoc)
            }
            catch(error){
                showToast("Error",error.message,"error")
            }
            finally{
                setIsLoading(false);
            }
        };
        getUserProfile();
    },[setUserProfile, username, showToast])
    return {isLoading, userProfile}

};

export default useGetProfileNameByUsername