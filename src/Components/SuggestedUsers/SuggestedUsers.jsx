import { Box, Flex, Spacer, VStack, Button, Text } from "@chakra-ui/react";
import React from "react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useSuggestedUsers from "../../hooks/useSuggestedUsers";

const SuggestedUsers = () => {
    const {usersSuggested} = useSuggestedUsers()
    return(
        <VStack gap={4} py={5} px={2}>
            <SuggestedHeader/>
            <Box w={"full"}bg={"gray.600"} h={"0.5px"}/>
            <Flex justifyContent={"space-between"} width={"full"} alignItems={"center"}>
                <Text fontSize={12} color={"gray.400"} fontWeight={"bold"}>
                    Suggested For You
                </Text>
                <Text fontSize={12} color={"blue.200"} cursor={"pointer"} 
                _hover={{color:"white"}}
                transition={"0.2s ease-in-out"}>
                    See All
                </Text>
            </Flex>
            {usersSuggested.map(userProfile => (
            <SuggestedUser username={userProfile} key={userProfile.id}/>
                )
            )}
            <Box w={"full"}bg={"gray.600"} h={"0.5px"}/>
        </VStack>
    )
}

export default SuggestedUsers