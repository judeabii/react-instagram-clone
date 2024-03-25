import { Avatar, Container, Flex, Button, Text, AvatarGroup, VStack, Skeleton } from '@chakra-ui/react'
import React from 'react'
import ProfileHeader from '../../Components/Profile/ProfileHeader'
import ProfileTabs from '../../Components/Profile/ProfileTabs'
import ProfilePosts from '../../Components/Profile/ProfilePosts'
import { useParams } from 'react-router-dom'
import useGetProfileNameByUsername from '../../hooks/useGetProfileNameByUsername'


const ProfilePage = () =>{

    const {username} = useParams()
    const {isLoading, userProfile} = useGetProfileNameByUsername({username})
    const userNotFound = !isLoading && !userProfile
    const userFound = !isLoading && userProfile
    return(
        <Container maxWidth={"container.md"} borderRadius={6} border={"1px"} borderColor={"white"} py={5}>
            <Flex 
            py={10}
            px={4}
            width={"full"}
            mx={"auto"}
            direction={"column"}>
                {isLoading && <HeaderSkeleton/>}
                {userFound && <ProfileHeader username={username}/>}
                {userNotFound && <InvalidUser/>}
            </Flex>
            <Flex
                mx={"auto"}
                maxWidth={"full"}
                border={"1px solid"}
                borderColor={"white"}
                flexDirection={"column"}>
                    <ProfileTabs isLoading={isLoading}/>
            </Flex>
                
        </Container>
    )
}

export default ProfilePage

const InvalidUser = () => {
    return(
        <Flex direction={{base:"column",sm:"row"}} py={10} gap={{base:4, sm:10}}>
            <AvatarGroup size={{base:"xl",md:"2xl"}} justifyContent={"center"} alignItems={"center"}>
                    <Avatar></Avatar>
            </AvatarGroup>
            <Flex alignItems={"center"} justifyContent={"center"} height={"full"}> 
                <Container>
                    User Not Found
                </Container>
            </Flex>
    </Flex>
    )
}

const HeaderSkeleton = () => {
    return(
        <Flex direction={{base:"column",sm:"row"}} py={10} gap={{base:4, sm:10}}>
        <AvatarGroup size={{base:"xl",md:"2xl"}} justifyContent={"center"} alignItems={"center"}>
                    <Avatar></Avatar>
        </AvatarGroup>
        <VStack direction={"column"} gap={2} alignItems={"start"}>
                    <Skeleton height={'7'} width={'200px'}/>
                    <Skeleton height={'16'} width={'200px'}/>
        </VStack>
        </Flex>
    )
}
