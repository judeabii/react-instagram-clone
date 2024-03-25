import {useNavigate} from 'react-router-dom'

const useAuthCheck = () => {
    const navigate = useNavigate();
    const authCheck =(inputs) =>{
        const isEmpty = Object.values(inputs).some((value) => !value);

        if (isEmpty){
        alert("Fill in all the fields")
        return isEmpty
    }
    else{
        navigate('/')
    }
}
return authCheck
}

export default useAuthCheck