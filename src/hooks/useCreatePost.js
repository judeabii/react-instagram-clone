import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, setDoc, updateDoc, where, doc, addDoc, arrayUnion } from 'firebase/firestore';
import { auth, firestore, storage } from '../Firebase/firebase';
import useAuthStore from '../store/authStore';
import useProfileStore from '../store/userProfileStore'
import postStore from "../store/postStore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";


const useCreatePost = ({pathname}) =>{
    const createPost = postStore(state => state.createPost)
    const userLoggedIn = useAuthStore(state => state.userLoggedIn)
    const {userProfile, addPost} = useProfileStore()
    const showToast = useShowToast()
    const [isUpdating, setIsUpdating] = useState(false)

    const createPostFunc = async(selectedFile, caption) => {
        if(!selectedFile){
            showToast("Error","Please select an image", "error")
            return;
        }
        if(selectedFile){
            console.log(typeof(selectedFile))
            setIsUpdating(true)
            const newPost = {
                caption:caption || "",
                likes:[],
                comments:[],
                createdAt: Date.now(),
                createdBy: userLoggedIn.uid
            }

            try{
                const userRef = doc(firestore, "users", userLoggedIn.uid)
                const postDocRef = await addDoc(collection(firestore,"posts"),newPost)
                const newUserData = {
                    ...userLoggedIn,
                    posts:arrayUnion(postDocRef.id)
                }
                const imageRef = ref(storage,`posts/${postDocRef.id}`)
                await updateDoc(userRef,newUserData)
                await uploadString(imageRef,selectedFile,"data_url")
                const downloadURL =await getDownloadURL(imageRef)

                const newPostData = {
                    ...newPost,
                    imageURL: downloadURL,
                    id:postDocRef.id
                }
                await updateDoc(postDocRef,newPostData)

                if(pathname!=='/' && userProfile.uid === userLoggedIn.uid){
                    addPost(newPostData)
                }
                if(userProfile.uid === userLoggedIn.uid){
                    createPost(newPostData)
                }

                showToast("Success","Post created","success")
                setIsUpdating(false)
            }
            catch(error){
                console.log(error)
            }
            finally{
                setIsUpdating(false)
            }
        }
    }
    return {isUpdating, createPostFunc}
}
export default useCreatePost;