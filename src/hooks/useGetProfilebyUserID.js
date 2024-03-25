import { useEffect, useState } from "react";
import useProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, firestore, storage } from '../Firebase/firebase';

const useGetProfilebyUserID = (userID) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const [userProfile, setUserProfile] = useState(null)
    useEffect(() => {
        const getUserProfileByID = async() => {
            try{
                console.log("data")
                const userProfileRef = collection(firestore, "users")
                const q =query(userProfileRef,where("uid","==",userID))
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
                    console.log("now")
                    console.log(userDoc)
                });
                setUserProfile(userDoc)
            }
            catch(error){
                showToast("Error",error.message,"error")
                console.log(error)
            }
            finally{
                setIsLoading(false);
            }
        };
        getUserProfileByID();
    },[setUserProfile, userID, showToast])
    return {isLoading, userProfile}

};

export default useGetProfilebyUserID