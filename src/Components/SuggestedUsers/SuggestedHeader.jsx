import { Avatar, Flex, Text} from "@chakra-ui/react";
import React from "react";
import { Link as ChakraLink, Button } from '@chakra-ui/react'
import useAuthStore from "../../store/authStore";
import useLogOut from "../../hooks/useLogOut";

const SuggestedHeader = () => {
    const userLoggedIn = useAuthStore(state => state.userLoggedIn)
    const {logOutUser, error, loading} = useLogOut()
    return(
        <Flex width={"full"} justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={2} alignItems={"center"}>
                <Avatar size={"md"} name={userLoggedIn.name}></Avatar>
                <Text fontSize={14} fontWeight={"bold"}>
                    {userLoggedIn.username}
                </Text>
            </Flex>
            <Button
            cursor={"pointer"}
            _hover={{color:"white"}}
            color={"blue.200"}
            background={"transparent"}
            size={"small"}
            onClick={logOutUser}>
                <Text fontSize={12} fontWeight={"medium"}>
                    Log out
                </Text>
            </Button>
        </Flex>
    )
}

export default SuggestedHeader