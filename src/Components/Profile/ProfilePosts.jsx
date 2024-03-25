import { Grid, GridItem, Skeleton, Text, Box, VStack } from '@chakra-ui/react'
import {React, useState, useEffect} from 'react'
import ProfilePost from './ProfilePost'
import useUserPosts from '../../hooks/useUserPosts'

const ProfilePosts = ({}) => {

    const {posts, isLoadingPosts} = useUserPosts()

    const noPostFound =!isLoadingPosts && posts.length===0;

    return(
        <>
        {noPostFound && (<NoPosts/>)}
        <Grid
			templateColumns={{
				sm: "repeat(1, 1fr)",
				md: "repeat(3, 1fr)",
			}}
			gap={1}
			columnGap={1}
		>
			{isLoadingPosts &&
				[0, 1, 2,3,4,5].map((_, idx) => (
					<VStack key={idx} alignItems={"flex-start"} gap={4}>
						<Skeleton w={"full"}>
							<Box h='300px'>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{!isLoadingPosts && (
				<>
					{posts.map((post) => (
						<ProfilePost post={post} key={post.id} />
					))}
				</>
			)}
		</Grid>
        </>
    )
}

const NoPosts = () => {
    return (
      <div className="no-posts-container">
        <h2>No Posts Yet</h2>
        <p>Start sharing your moments with friends and followers!</p>
      </div>
    );
  };

  export default ProfilePosts
