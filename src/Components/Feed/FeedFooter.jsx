import React, { useState } from 'react'
import {Input, VStack, Button, Flex, Box, Text, Image, Container, Spacer, InputGroup, InputRightElement, Skeleton, useDisclosure} from "@chakra-ui/react"
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../Assets/constants'
import { color } from 'framer-motion'
import usePostComment from '../../hooks/usePostComment'
import { useRef } from 'react'
import useLikePost from '../../hooks/useLikePost'
import PostModal from '../Comments/PostModal'
import { Link } from 'react-router-dom'

const FeedFooter = ({post, isProfile, userProfile}) => {

    const [commentBox, setCommentBox] = useState(false)
    const {isCommenting, postComment} = usePostComment()
    const [comment, setComment] = useState("")
    const {isLiking, isLiked, likes, handleLikePost} = useLikePost(post)
    const {isOpen, onOpen, onClose} = useDisclosure()

    const showComment = () => {
        console.log("clicked")
        setCommentBox((prevComment) => !prevComment)
    }
    const handleSubmitComment = async() => {
        await postComment(post.id, comment)
        setComment("")
    }
    const commentRef = useRef(null)

    return(
        <>
        {!userProfile && (
            <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height={'30px'} w={"full"}/>
                <Skeleton height='10px' w={"200px"} />
                <Skeleton height='10px' w={"200px"} />
            </VStack>
        )}
        {userProfile && (
            <>
            <Flex gap={2} alignItems={"center"} mt={4} fontSize={12} w={"full"} pt={0} marginBottom={2}>
                <Box onClick={handleLikePost} cursor={"pointer"} fontSize={15}>
                    {!isLiked? <NotificationsLogo/> : <UnlikeLogo/>}
                </Box>
                <Box onClick={()=> {showComment(); commentRef.current.focus()}} cursor={"pointer"}>
                    <CommentLogo/>
                </Box>
            </Flex>
            <Box fontSize={12}>
                <Text>
                    {likes} likes
                </Text>
            </Box>
            {!isProfile && (
                <>
                    <Text fontSize={"small"} fontWeight={700}>
                        <Link to={`/${userProfile.username}`}>{userProfile.username+" "}</Link>
                <Text  as="span" fontWeight={400}>
                    {post.caption}
                </Text>
            </Text>
            <Text fontSize={"small"} color={"gray"} onClick={onOpen} marginBottom={commentBox? 0:10} cursor={"pointer"}>
                View all {post.comments.length} comments
            </Text>
            
            {isOpen && (
                <PostModal isOpen={isOpen} onClose={onClose} post={post}/>
            )}
                </>
            )}
            <InputGroup size={"xs"} marginBottom={6} display={commentBox || isProfile? "block":"none"}>
                <Input placeholder='Add a comment' type='text' fontSize={"12px"} onChange={(e)=>setComment(e.target.value)}
                value={comment} ref={commentRef} borderRadius={8}/>
                <InputRightElement width={"auto"}>
                    <Button size={"xs"} fontSize={"12px"} bg={"blue.500"} cursor={"pointer"} _hover={{color:"gray.400", bg:"blue.600"}}
                    onClick={handleSubmitComment} isLoading={isCommenting}>
                        Post
                    </Button>
                </InputRightElement>
            </InputGroup>
            </>
        )}
        </>
    )
}

export default FeedFooter