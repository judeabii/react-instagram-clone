import { VStack, Input, Button, InputGroup, InputRightElement, Alert, AlertDescription} from "@chakra-ui/react";
import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons"

const Login = () => {
    const [inputs, SetInputs] = useState({
        email:"",
        password:"",
    })
    const {error, loading, signIn} = useLogin()

    const [showPassword, setShowPassword] = useState(false)

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
            <InputGroup>
                <Input size={'sm'} variant={'outline'} placeholder="Password" type={showPassword? "text" : "password"} fontSize={14} value={inputs.password}
                onChange={handleChange} name="password"/>
                <InputRightElement>
                    <Button onClick={() => setShowPassword((prevshowPassword) => !prevshowPassword)} variant={"ghost"}>
                        {!showPassword? <ViewIcon/> : <ViewOffIcon/>}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {error && (
                <Alert status="error" fontSize={13} borderRadius={4}>
                        {error.message}
                </Alert>
            )}
            <Button w={'full'} size={'sm'} colorScheme="messenger" fontSize={14} onClick={()=> signIn(inputs)} isLoading={loading}>
                Login
            </Button>
        </VStack>
    )
}

export default Login