import { useState } from "react";
import useShowToast from "./useShowToast";

const useImage = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const showToast = useShowToast()
    const maxFileSize = 2 *1024*1024

    const ImageSelect = (e) =>{
        const file = e.target.files[0]
        console.log(file)
        console.log(file?.type)
        if (file && file.type.startsWith("image/")){
            if (file.size>maxFileSize){
                showToast("Error", "File too large","error")
                setSelectedFile(null)
                return
            }
            else{
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedFile(reader.result)
                }
                reader.readAsDataURL(file)
            }
        }
        else{
            showToast("Error","Please select an image","error")
            setSelectedFile(null)
            return
        }
    }
    return {ImageSelect, selectedFile, setSelectedFile}
}

export default useImage