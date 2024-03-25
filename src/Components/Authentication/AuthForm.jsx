import React, { useState } from "react";
import {Input, VStack, Button, Flex, Box, Text, Image} from "@chakra-ui/react"
import useAuthCheck from '../../hooks/useAuthCheck'
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
    const [isLogin, setLogin] = useState(true)

    const authCheck = useAuthCheck()


    const changeState = () => {
        setLogin(!isLogin)
    }

    return(
        <>
        <Box border={"1px"} borderColor={"gray.600"} borderRadius={1} padding={8}>
        <VStack width={"full"}>
            <Image src="/logo.png" cursor={"pointer"}/>
            {isLogin? <Login/> : <SignUp/>}
            <Flex alignItems={"center"} justifyContent={"center"} gap={1} my={4} w={"full"}>
                <Box flex = {2} bg={"white"} h={"1px"}/>
                <Text fontSize={14}>OR</Text>
                <Box flex = {2} bg={"white"} h={"1px"}/>
            </Flex>
            <GoogleAuth/>
        </VStack>
        </Box>

        <Box border={"1px"} borderColor={"gray.600"} borderRadius={1} padding={8}>
            <Flex alignItems={"center"} justifyContent={'center'} gap={2}>
                <Box fontSize={14}>
                {isLogin ?(
                        "Don't have an account?"
                ): (
                        "Already have an account?"
                )}
                </Box>
                <Box>
                    {isLogin ?(
                        <Text size={'sm'} color="blue.500" fontSize={14} onClick={changeState} cursor={"pointer"}>
                            Sign Up
                        </Text>
                    ):(
                        <Text size={'sm'} color="blue.500" fontSize={14} onClick={changeState} cursor={"pointer"}>
                            Login
                        </Text>
                    )}
                </Box>
            </Flex>
        </Box>
        
        </>
    );
    
}


export default AuthForm