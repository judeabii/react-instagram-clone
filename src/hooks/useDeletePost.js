import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, setDoc, updateDoc, where, doc, addDoc, arrayUnion, deleteDoc, arrayRemove } from 'firebase/firestore';
import { auth, firestore, storage } from '../Firebase/firebase';
import useAuthStore from '../store/authStore';
import useProfileStore from '../store/userProfileStore'
import postStore from "../store/postStore";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";

const useDeletePost = () => {
    const  userLoggedIn = useAuthStore(state => state.userLoggedIn)
    const showToast = useShowToast()
    const [isDeleting, setIsDeleting] = useState(false)
    const deletePost = postStore(state => state.deletePost)
    const removePost = useProfileStore(state => state.deletePost)

    const deletePostFunc = async(post) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try{
            setIsDeleting(true)
            console.log(post.id)
            console.log(userLoggedIn.uid)
            const imageRef = ref(storage,`posts/${post.id}`)
            await deleteObject(imageRef)
            await deleteDoc(doc(firestore,"posts",post.id))
            const userRef = doc(firestore, "users", userLoggedIn.uid)
            await updateDoc(userRef,  {
                posts: arrayRemove(post.id)
            })
            deletePost(post.id)
            removePost(post.id)
            showToast("Success","Post deleted","success")
        }
        catch{

        }
        finally{
            setIsDeleting(false)
        }
    }
    return {isDeleting, deletePostFunc}
}

export default useDeletePost