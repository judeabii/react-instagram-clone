import { VStack, Input, Button, InputGroup, InputRightElement, Alert, AlertDescription, AlertTitle, Text, AlertIcon, Center} from "@chakra-ui/react";
import React, { useState } from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons"
import useSignUpwithEmailandPassword from "../../hooks/useSignUpwithEmailandPassword";
import { AiFillLeftCircle } from "react-icons/ai";

const SignUp = () =>{

    const [inputs, SetInputs] = useState({
        email:"",
        name:"",
        username:"",
        password:"",
    })

    const [showPassword, setShowPassword] = useState(false)
    
    const {loading, error, signup} = useSignUpwithEmailandPassword()


    const handleChange = (e) => {
        const {name, value} = e.target
        SetInputs((prevInputs) => ({
            ...prevInputs,
            [name]:value
        }))
        
    
    }


    return(
        <VStack width={"full"}>
            <Input size={'sm'} variant={'outline'} placeholder="Email" fontSize={14} value={inputs.email} onChange={handleChange}
            name="email"/>
            <Input size={'sm'} variant={'outline'} placeholder="Full Name" fontSize={14} value={inputs.name} onChange={handleChange}
            name="name"/>
            <Input size={'sm'} variant={'outline'} placeholder="Username" fontSize={14} value={inputs.username} onChange={handleChange}
            name="username"/>
            <InputGroup>
                <Input size={'sm'} variant={'outline'} placeholder="Password" type={showPassword? "text" : "password"} fontSize={14} value={inputs.password}
                onChange={handleChange} name="password"/>
                <InputRightElement>
                    <Button onClick={() => setShowPassword((prevshowPassword) => !prevshowPassword)} variant={"ghost"}>
                        {!showPassword? <ViewIcon/> : <ViewOffIcon/>}
                    </Button>
                </InputRightElement>
            </InputGroup>


            <Button w={'full'} size={'sm'} colorScheme="messenger" fontSize={14} onClick={() => signup(inputs)} isLoading={loading}>
                Sign up
            </Button>
        </VStack>
    )
}

export default SignUp

