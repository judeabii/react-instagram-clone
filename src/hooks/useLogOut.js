import { useSignOut } from 'react-firebase-hooks/auth';
import { auth, firestore, storage } from '../Firebase/firebase';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

const useLogOut = () => {
    const logOut = useAuthStore((state)=>state.logout)
    const [signOut, loading, error] = useSignOut(auth);
    const showToast = useShowToast()
    const logOutUser = async() => {
        try{
            await signOut()
            logOut()
            localStorage.removeItem("user-info")
        }
        catch(error){
            console.log(error)
        }
        if(error){
            showToast("Error",error.message,"error")
            return
        }
    }
    return {logOutUser, loading, error}
}

export default useLogOut