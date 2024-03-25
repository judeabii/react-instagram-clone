import React, { useEffect, useState } from 'react'
import {Input, VStack, Button, Flex, Box, Text, Image, Container, Skeleton, SkeletonCircle} from "@chakra-ui/react"
import FeedPost from './FeedPost'
import useGetFeedPosts from '../../hooks/useGetFeedPosts'

const Feed = () => {
    const {isLoading, posts} = useGetFeedPosts()
    const postsLoaded = !isLoading && posts

    if (isLoading){
        return(
            <>
            {[0, 1, 2,3,4,5].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mb={10} mt={10}>
						<Flex gap='2'>
							<SkeletonCircle size='10' />
							<VStack gap={2} alignItems={"flex-start"}>
								<Skeleton height='10px' w={"200px"} />
								<Skeleton height='10px' w={"200px"} />
							</VStack>
						</Flex>
						<Skeleton w={"full"}>
							<Box h={"400px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}
            </>
        )
    }

    if (postsLoaded && posts.length === 0) {
        return <Flex
        height="100vh" /* Adjust as needed */
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        fontSize="18px"
        color="#345" /* Adjust text color as needed */
      >
        No posts found.
        You can start by following: "judeab07"
      </Flex>;
    }

    return(
        <>
        <Container maxWidth={"container.sm"} py={5} px={2}>
            {posts.map((post) =>
                <FeedPost key={post.id} post={post}/>
            )}
        </Container>
        </>
    )
}

export default Feed