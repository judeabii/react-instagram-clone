import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, setDoc, where, orderBy, limit, doc } from 'firebase/firestore';
import { auth, firestore, storage } from '../Firebase/firebase';
import useProfileStore from "../store/userProfileStore";
import postStore from "../store/postStore";

const useUserPosts = () => {
    const {posts, setPosts} = postStore()
    const userProfile = useProfileStore(state => state.userProfile)
    const [userPosts, setUserPosts] = useState([])
    const showToast = useShowToast()
    const [isLoadingPosts, setIsLoadingPosts] = useState(false)

    useEffect(() => {
        const getUserPosts = async() => {
            try{
                setIsLoadingPosts(true)
                setPosts([])
                const userPostRef = collection(firestore,"posts")
                const q = query(userPostRef,where("createdBy","==",userProfile.uid))
                const querySnapshot = await getDocs(q)

                const posts = []

                querySnapshot.forEach(doc => {
                    posts.push({...doc.data(), id:doc.id})
                })
                setPosts(posts)
                setIsLoadingPosts(false)
            }
            catch(error){
                console.log(error)
                showToast("error","Couldn't post image","error")
                setPosts([])
            }
            finally{
                setIsLoadingPosts(false)
            }
        }
        getUserPosts();
    },[userProfile, setPosts, showToast])
    return {posts, isLoadingPosts}

}
export default useUserPosts;