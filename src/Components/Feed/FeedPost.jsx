import React from 'react'
import {Input, VStack, Button, Flex, Box, Text, Image, Container, Skeleton} from "@chakra-ui/react"
import FeedHeader from './FeedHeader'
import FeedFooter from './FeedFooter'
import useGetProfilebyUserID from '../../hooks/useGetProfilebyUserID'

const FeedPost = ({post}) => {
    const {isLoading, userProfile} = useGetProfilebyUserID(post.createdBy)
    return(
        <>
            <FeedHeader post={post} userProfile={userProfile}/>
            <Skeleton isLoaded={!isLoading}>
            <Box width={"full"} overflow={"hidden"}>
                <Image src={post.imageURL}/>
            </Box>
            </Skeleton>
            <FeedFooter post={post} isProfile={false} userProfile={userProfile}/>
        </>
    )
}

export default FeedPost