import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, setDoc, where, orderBy, limit } from 'firebase/firestore';
import { auth, firestore, storage } from '../Firebase/firebase';
import useAuthStore from '../store/authStore';

const useSuggestedUsers = () =>{
    const {userLoggedIn, login} = useAuthStore()
    const [usersSuggested, setUsersSuggested] = useState([])

    useEffect(() => {
        const getSuggestedUsers = async() => {
            try{
                const SuggestedRef = collection(firestore, "users")
                const q = query(SuggestedRef,
                    where("uid","not-in",[userLoggedIn.uid, ...userLoggedIn.following]),
                    orderBy("uid"),
                    limit(3))

                    const querySnapshot = await getDocs(q)
                    const users = []
                    querySnapshot.forEach(doc => {
                        users.push({...doc.data(), id:doc.id})
                    })
                
                    setUsersSuggested(users)
            }
            catch(error){
                console.log(error)
            }
            finally{
                
            }
        }

        if(userLoggedIn){
            getSuggestedUsers()
        }

    },[userLoggedIn])

    return {usersSuggested}

}

export default useSuggestedUsers