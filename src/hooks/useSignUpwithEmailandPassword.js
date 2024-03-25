import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore, storage } from '../Firebase/firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useState } from "react";
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

const useSignUpwithEmailandPassword = () =>{
    const showToast = useShowToast()

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const userLogin = useAuthStore(state => state.login)

      const signup = async (inputs) =>{
        const hasEmptyValues = Object.values(inputs).some((value) => !value);
        if(hasEmptyValues){
            showToast("Error","Please fill in all values","error");
            return;
        }
        try{
            const userRef = collection(firestore, "users")
            const q =query(userRef,where("username","==",inputs.username))
            const querySnapshot = await getDocs(q)

            if(!querySnapshot.empty){
                showToast("Error","Username already exists","error")
                return
            }
        }
        catch(error){
            console.log(error)
        }
        try{
            const userCredential = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if(!userCredential || error){
                showToast("Error",error.message,"error")
                return;
            }
            if(userCredential){
                const userDoc = {
                    uid:userCredential.user.uid,
                    email:userCredential.user.email,
                    username:inputs.username,
                    name:inputs.name,
                    bio:"",
                    profilePic:"",
                    followers:[],
                    following:[],
                    posts:[],
                    createdAt:Date.now(),
                }
                await setDoc(doc(firestore, "users", userCredential.user.uid), userDoc);
                localStorage.setItem("user-info",JSON.stringify(userDoc));
                userLogin(userDoc)
                }
            }
            catch(error){
                console.log(error)
            }
        }
    return {error, loading, signup}
};

export default useSignUpwithEmailandPassword