import React from 'react'
import {Flex, Container, Box, Image, VStack} from "@chakra-ui/react"
import AuthForm from '../../Components/Authentication/AuthForm';

const Auth = () => {
    return(
        <Flex minH={"100vh"} justifyContent={'center'} alignItems={"center"} px={4}> 
            <Container maxW={"800px"} padding={0}>
                <Flex alignItems={"center"} justifyContent={'center'} gap={5}>
                <Box display={{base:"none", md: "block"}}>
                    <Image src='/auth.png' h={650} alt='Phone screenshot'/>
                </Box>
                <VStack spacing={2} align={'stretch'} flex={1} p={"10px"}>
                    <AuthForm/>
                    <Box textAlign={"center"} marginTop={2} fontSize={14}>
                        Get the app.
                    </Box>
                </VStack>
                </Flex>
            </Container>
        </Flex>
    );
};

export default Auth;