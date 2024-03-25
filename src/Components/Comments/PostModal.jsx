import { Flex, GridItem, Text, Image, Skeleton, useDisclosure, Container, Box, Avatar, Spacer, VStack, Divider, Button} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import React from 'react'
import FeedFooter from '../Feed/FeedFooter';
import useGetProfilebyUserID from '../../hooks/useGetProfilebyUserID';
import getTimeDifference from '../../utils/timeAgo';
import Comments from './Comments';
import { Link } from 'react-router-dom';

const PostModal = ({isOpen, onClose, post}) => {
    const {isLoading, userProfile} = useGetProfilebyUserID(post.createdBy)

    return(
        <>
        {userProfile && (
            <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInRight'
            size={{base:"3xl",sm:"5xl"}}
            >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader paddingLeft={3} pt={1} pb={1}>
          <Flex alignItems={"center"} justifyContent={"flex-start"}>
                <Flex gap={2} alignItems={"center"}>
                    <Avatar size={"sm"} src={userProfile.profilePic} name={userProfile.name}/>
                    <Text fontSize={14} fontWeight={"bold"}>
                        {userProfile.username}
                    </Text>
                </Flex>
                <Spacer/>
            </Flex>
          </ModalHeader>
          <ModalBody bg={"#0E1514"} padding={0}>
                <Flex padding={0} width={"full"} gap={2}>
                    <Flex overflow={"hidden"}  minHeight={{base:null,md:"400px"}} maxHeight={"500px"} maxWidth={{base:"100%", md:"50%"}}>
                        <Flex justifyContent={"center"} alignItems={"center"} height={"full"}>
                        <Image src={post.imageURL} height={"full"} objectFit={"contain"} objectPosition={"center"}/>
                        </Flex>
                    </Flex>
                    <Flex direction={"column"} display={{base:"none", md:"flex"}} width={"full"} p={4}>
                        <VStack justifyContent={"flex-start"} alignItems={"flex-start"} overflowY={"auto"} marginBottom={"auto"}>
                            <Flex justifyContent={"flex-start"} alignItems={"center"} gap={2}>
                            <Link to={`/${userProfile.username}`}>
                                <Avatar size={"sm"} src={userProfile.profilePic} name={userProfile.name}></Avatar>
                            </Link>
                            <Flex direction={"column"}>
                            <Text fontSize={"small"} fontWeight={700}>
                                {userProfile.username}{" "}
                                <Text  as="span" fontWeight={400}>
                                {post.caption}
                                </Text>
                            </Text>
                            <Text fontSize={10} color={"gray"}>
                                {getTimeDifference(post.createdAt)}
                            </Text>
                            </Flex>
                            </Flex>
                            <Divider my={3} bg={"white.700"}/>
                            {post.comments.map(postComment => (
                                <Comments key={postComment.id} comment={postComment}/>
                            ))}
                        </VStack>
                        <FeedFooter post={post} isProfile={true} userProfile={userProfile}/>
                    </Flex>
                </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
        )}
        </>
    )

}

export default PostModal