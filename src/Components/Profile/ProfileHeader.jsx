import { Avatar, Container, Flex, Button, Text, AvatarGroup, VStack, Skeleton, Box, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { auth, firestore, storage } from '../../Firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import useAuthStore from "../../store/authStore";
import useProfileStore from '../../store/userProfileStore'
import EditProfile from './EditProfile';
import FollowUnfollowUser from '../../hooks/FollowUnfollowUser';

const ProfileHeader = () => {
    const [user, loading, error] = useAuthState(auth);
    const userLoggedIn = useAuthStore(state => state.userLoggedIn)
    const profileUser = useProfileStore(state => state.userProfile)
    const ownProfile = userLoggedIn && userLoggedIn.username === profileUser.username
    const vistingProfile = userLoggedIn && userLoggedIn.username !== profileUser.username
    const { isOpen, onOpen, onClose } = useDisclosure(profileUser.uid)
    const {isFollowing, followOrUnfollow, isUpdating} = FollowUnfollowUser(profileUser.uid)

    return(
            <Flex direction={{base:"column",sm:"row"}} py={10} gap={{base:4, sm:10}}>
                <AvatarGroup size={{base:"xl",md:"2xl"}} justifyContent={"center"} alignItems={"center"}>
                    <Avatar src={profileUser.profilePic} name={profileUser.name}></Avatar>
                </AvatarGroup>
                <VStack direction={"column"} gap={2} alignItems={"start"}>
                    <Flex 
                    gap={4}
                    direction={{base:"column", sm:"row"}}
                    justifyContent={{base:"center", sm:"flex-start"}}
                    alignItems={"center"}
                    width={"full"}>
                        <Text>
                            {profileUser.username}
                        </Text>
                        {ownProfile && (
                            <Button fontSize={13} size={{base:"xs",sm:"sm"}} width={{base:"full",sm:"flex"}}
                            onClick={onOpen}>
                            Edit Profile
                        </Button>
                        )}
                        {vistingProfile && (
                            <Button fontSize={13} size={{base:"xs",sm:"sm"}} width={{base:"full",sm:"flex"}}
                            onClick={followOrUnfollow} bg={isFollowing?"gray.600":"blue.500"} isLoading={isUpdating}>
                            {isFollowing? "Unfollow":"Follow"}
                        </Button>
                        )}
                    </Flex>
                    <Flex alignItems={"center"} gap={{base:2, sm:4}} justifyContent={{base:"center",sm:"flex-start"}} width={"full"}>
                        <Text>
                            <Text as={"span"} marginRight={1} fontWeight={"bold"}>
                                {profileUser.posts.length}
                            </Text>
                            Posts
                        </Text>
                        <Text>
                            <Text as={"span"} marginRight={1} fontWeight={"bold"}>
                                {profileUser.followers.length}
                            </Text>
                            Followers
                        </Text>
                        <Text>
                            <Text as={"span"} marginRight={1} fontWeight={"bold"}>
                            {profileUser.following.length}
                            </Text>
                            Following
                        </Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={4} justifyContent={{base:"center",sm:"flex-start"}} width={"full"}>
                        <Text fontWeight={"bold"} fontSize={"sm"}>
                        {profileUser.name}
                        </Text>
                    </Flex>
                    <Text fontSize={"sm"} justifyContent={{base:"center",sm:"flex-start"}} width={"full"}>
                        {profileUser.bio}
                    </Text>
                </VStack>
                {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
            </Flex>
    )
}


export default ProfileHeader