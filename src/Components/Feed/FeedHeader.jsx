import React from 'react'
import {Input, VStack, Button, Flex, Box, Text, Image, Container, Spacer, Skeleton, SkeletonCircle} from "@chakra-ui/react"
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import getTimeDifference from '../../utils/timeAgo'
import { Link } from 'react-router-dom'
import FollowUnfollowUser from '../../hooks/FollowUnfollowUser';

const FeedHeader = ({post, userProfile}) => {
    const {isFollowing, followOrUnfollow, isUpdating} = FollowUnfollowUser(userProfile?.uid)
    return(
        <>
        {!userProfile && (
            <Flex gap='2' my={6} alignItems={"center"}>
            <SkeletonCircle size='10' />
            <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height='10px' w={"200px"} />
                <Skeleton height='10px' w={"200px"} />
            </VStack>
        </Flex>
        )}
        {userProfile &&(
            <Flex width={"full"} alignItems={"center"} justifyContent={"center"} my={6}>
            <Flex gap={2} alignItems={"center"}>
            <Link to={`/${userProfile.username}`}>
                <Avatar size={"md"} src={userProfile.profilePic} name={userProfile.name}></Avatar>
            </Link>
                <Flex gap={2} alignItems={"center"} justifyContent={"center"}>
                <Link to={`/${userProfile.username}`}>
                    <Text fontSize={14}>{userProfile.username}</Text>
                </Link>
                    <Box color={"gray.500"} fontSize={11}>
                        {getTimeDifference(post.createdAt)}
                    </Box>
                </Flex>
            </Flex>
            <Spacer/>
            <Button cursor={"pointer"} onClick={followOrUnfollow} isLoading={isUpdating} bg={"transparent"}>
                <Text fontSize={12} color={"blue.200"}
                _hover={{color:"white"}}
                transition={"0.2s ease-in-out"}>
                    Unfollow
                </Text>
            </Button>
        </Flex>
        )}
        </>
    )
}

export default FeedHeader