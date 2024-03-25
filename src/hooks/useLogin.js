import { auth, firestore, storage } from '../Firebase/firebase';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

const useLogin = () => {
    const showToast = useShowToast()
    const userLogin = useAuthStore(state => state.login)

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      const signIn = async(inputs) => {
        const hasEmptyValues = Object.values(inputs).some((value) => !value);
        if(hasEmptyValues){
            showToast("Error","Please fill in all values","error");
            return;
        }
        try{
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)
            if(userCred && userCred.user){
                const userRef = doc(firestore,"users",userCred.user.uid)
                const userSnapshot = await getDoc(userRef)

                if(userSnapshot.exists()){
                    const userDoc = userSnapshot.data()
                    localStorage.setItem("user-info",JSON.stringify(userDoc));
                    userLogin(userDoc)
                }
                else{
                    console.error("User document does not exist.");
                }
            }
        }
        catch(error){
            console.log(error)
        }
      }
      return {error,loading,signIn}

}

export default useLogin

