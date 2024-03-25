import React, { useState} from "react";
import {Flex, Container, Box, Image, VStack} from "@chakra-ui/react"
import Sidebar from "../../Components/Sidebar/Sidebar";
import {useLocation} from 'react-router-dom'
import useAuthStore from "../../store/authStore";
import { auth, firestore, storage } from '../../Firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const PageLayout = ({children}) => {
    const location = useLocation()
    const [user, loading, error] = useAuthState(auth);
    const renderSideBar = location.pathname!=="/auth" && user
    return(
        <Flex>
            {!renderSideBar? null :(
                <Box w={{base: "60px", md: "240px"}}> 
                    <Sidebar/>
                </Box>
            )}
            <Box flex={1} w={{base: "calc(100% - 60px)", md: "calc(100%-240px)"}}>
                {children}
            </Box>
        </Flex>
    )
}

export default PageLayout