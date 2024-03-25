import React from "react";
import {Input, VStack, Button, Flex, Box, Text, Image, Tooltip, Avatar} from "@chakra-ui/react"
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from "../../Assets/constants";
import {AiFillHome} from 'react-icons/ai'
import {BiLogOut} from 'react-icons/bi'
import useLogOut from "../../hooks/useLogOut";
import useAuthStore from "../../store/authStore";
import SideBarItems from "./SidebarItems";


const Sidebar = () => {
const {logOutUser, error, loading} = useLogOut()



    return(
        <Box
        height={"100vh"}
        borderRight={"1px"}
        borderColor={"white"}
        px={{base:2, md:4}}
        position={"sticky"}
        top={0}
        left={0}
        py={8}
        >
            <Flex direction={"column"} gap={10} w={"full"} h={"full"}>
            <ChakraLink as={ReactRouterLink} to={'/'} pl={2} display={{base:"none", md:"block"}}>
                <InstagramLogo/>
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to={'/'} pl={2} display={{base:"block", md:"none"}} _hover={{bg:"white.400"}}>
                <InstagramMobileLogo/>
            </ChakraLink>
            <Flex direction={"column"} gap={6}>
                <SideBarItems/>
            </Flex>
            <Tooltip
                    label="Logout"
                    hasArrow
                    placement={"right-start"}
                    openDelay={300}
                    display={{base:"block", md:"none"}}
                    >
                        <ChakraLink
                        as={ReactRouterLink}
                        to={'/'}>
                        <Flex
                        onClick={logOutUser}
                        alignItems={"center"}
                        gap={4}
                        w={{base:10, md:"full"}}
                        p={2}
                        display={"flex"}
                        _hover={{bg:"gray.700"}}
                        borderRadius={3}
                        mt={"auto"}
                        cursor={"pointer"}>
                        <BiLogOut size={25}/>
                        <Box display={{base:"none", md:"block"}} flex={1} fontSize={14}>
                            {"Logout"}
                        </Box>
                    </Flex>
                    </ChakraLink>
                    </Tooltip>
            </Flex>
        </Box>
    )
}

export default Sidebar