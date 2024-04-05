import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, query, setDoc, updateDoc, where, doc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { auth, firestore, storage } from '../Firebase/firebase';
import useAuthStore from '../store/authStore';
import useProfileStore from '../store/userProfileStore'

const FollowUnfollowUser = (userId) => {
    const [isFollowing, setIsFollowing] = useState(false)
    const {setUserProfile, userProfile} = useProfileStore()
    const {userLoggedIn, login} = useAuthStore()
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        if(userLoggedIn){
            const isFollowing = userLoggedIn.following.includes(userId)
            setIsFollowing(isFollowing)
        }
    },[userLoggedIn, userId])

    const followOrUnfollow = async() => {
        let userLoggedInData;
        let profileUserData;
        setIsUpdating(true)

        try{
            if(isFollowing){
                userLoggedInData = {
                    ...userLoggedIn,
                    following: userLoggedIn.following.filter(userID => userID !== userId)
                }
                profileUserData = {
                    ...userProfile,
                    followers: userProfile.followers.filter(userID => userID !== userLoggedIn.uid)
                }
            }
            else{
                userLoggedInData = {
                    ...userLoggedIn,
                    following: [...userLoggedIn.following, userId]
                }
                profileUserData = {
                    ...userProfile,
                    followers: [...userProfile.followers, userLoggedIn.uid]
                }
            }

            const userRef = doc(firestore,"users",userLoggedIn.uid)
            const userFollowOrUnfollowRef = doc(firestore,"users",userId)
            const userSnapshot = await getDoc(userFollowOrUnfollowRef)
            if(userSnapshot.exists()){
                const userDoc = userSnapshot.data()
                setUserProfile(userDoc)

        
            await updateDoc(userRef, {
				following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
			});

			await updateDoc(userFollowOrUnfollowRef, {
				followers: isFollowing ? arrayRemove(userLoggedIn.uid) : arrayUnion(userLoggedIn.uid),
			});

            localStorage.setItem("user-info",JSON.stringify(userLoggedInData));
            setUserProfile(profileUserData)
            login(userLoggedInData)
            console.log(profileUserData)
            console.log(userLoggedInData)
            setIsUpdating(false)
            
        }
    }
        catch(error){
            console.log(error)
        }
        finally{
            setIsUpdating(false)
        }

    }
    return {isFollowing, followOrUnfollow, isUpdating}
}

export default FollowUnfollowUser;