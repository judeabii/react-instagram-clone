import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from '../store/authStore';
import { collection, getDoc, getDocs, query, setDoc, updateDoc, where, doc, addDoc, arrayUnion, setIndexConfiguration, arrayRemove } from 'firebase/firestore';
import { firestore } from "../Firebase/firebase";
import postStore from "../store/postStore";

const useLikePost = (post) => {
    const userLoggedIn = useAuthStore(state => state.userLoggedIn)
    const [isLiking, setIsLiking] = useState(false)
    const [likes, setLikes] = useState(post.likes.length)
    const [isLiked, setisLiked] = useState(post.likes.includes(userLoggedIn.uid))
    const {addLikes, removeLikes} = postStore()

    const handleLikePost = async() => {
        if(isLiking) return
        setIsLiking(true)

        try{
            if (!isLiked){
                updateDoc(doc(firestore, "posts", post.id), {
                    likes: arrayUnion(userLoggedIn.uid)
                });
                addLikes(post.id,userLoggedIn.uid)
            }
            else{
                updateDoc(doc(firestore, "posts", post.id), {
                    likes: arrayRemove(userLoggedIn.uid)
                });
                removeLikes(post.id,userLoggedIn.uid)
            }
            setisLiked(!isLiked)
            isLiked ? setLikes(likes -1) : setLikes(likes +1)
            console.log(post)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setIsLiking(false)
        }
    }
    return {isLiking, isLiked, likes, handleLikePost}
}

export default useLikePost