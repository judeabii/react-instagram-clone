import { Avatar, Button, Flex, Text, Box, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import FollowUnfollowUser from '../../hooks/FollowUnfollowUser';
import useAuthStore from '../../store/authStore';
import { Link } from "react-router-dom";

const SuggestedUser = ({username, setUserSearched, onClose}) => {
    const {userLoggedIn, login} = useAuthStore()
    const {isFollowing, followOrUnfollow, isUpdating} = FollowUnfollowUser(username?.uid)
    const onFollowUser = async() => {
        await followOrUnfollow()
        try{
        setUserSearched({
        ...username,
        followers : isFollowing? username.followers.filter(userID => userID !== userLoggedIn.uid): [...username.followers, userLoggedIn.uid],
        
    })}
    catch(error){
        console.log(error)
    }
    }

    return(
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex gap={2} alignItems={"center"}>
            <Link to={`/${username.username}`} onClick={onClose}>
                <Avatar size={"md"} src={username.profilePic} name={username.name}></Avatar>
            </Link>
                <VStack alignItems={"flex-start"} spacing={0}>
                <Link to={`/${username.username}`} onClick={onClose}>
                    <Box fontSize={14} fontWeight={"bold"} color={"white"}>
                        {username?.name}
                    </Box>
                </Link>
                <Box fontSize={12} color={"gray.500"}>
                    {username?.followers.length} followers
                </Box>
                </VStack>
            </Flex>
            {username.uid !== userLoggedIn.uid && (
                <Button fontSize={12} color={"blue.200"} cursor={"pointer"} 
                _hover={{color:"white"}}
                transition={"0.2s ease-in-out"}
                bg={"transparent"}
                variant={"none"}
                p={0}
                onClick={onFollowUser}
                isLoading={isUpdating}>
                    {isFollowing? "Unfollow": "Follow"}
            </Button>
            )}
        </Flex>
    )
}

export default SuggestedUser