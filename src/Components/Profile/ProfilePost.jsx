import { Flex, GridItem, Text, Image, Skeleton, useDisclosure, Container, Box, Avatar, Spacer, VStack, Divider, Button} from '@chakra-ui/react'
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
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
import { MdDelete } from "react-icons/md";
import Comments from '../Comments/Comments';
import FeedFooter from '../Feed/FeedFooter';
import useProfileStore from '../../store/userProfileStore';
import useDeletePost from '../../hooks/useDeletePost';
import getTimeDifference from '../../utils/timeAgo'
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';


const ProfilePost = ({post}) => {
    const userProfile = useProfileStore(state => state.userProfile)
    const userLoggedIn = useAuthStore(state => state.userLoggedIn)
    const {isDeleting, deletePostFunc} = useDeletePost()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDelete = async() => {
        await deletePostFunc(post)
        onClose();

    }

    return(
        <>
        <GridItem
            cursor={"pointer"}
            border={"1px solid"}
            borderColor={"white"}
            aspectRatio={1/1}
            position={"relative"}
            onClick={onOpen}
        >
            <Flex opacity={0}
            _hover={{opacity:1}}
            position={"absolute"}
            width={"full"}
            height={"full"}
            justifyContent={"center"}
            alignItems={"center"}
            bg={"blackAlpha.700"}
            transition={"all 0.3s ease"}>
                <Flex alignItems={"center"} justifyContent={"center"} gap={50} display={{base:"none", sm:"flex"}}>
						<Flex>
							<AiFillHeart size={20} />
							<Text ml={2}>
								{post.likes.length}
							</Text>
						</Flex>

						<Flex>
							<FaComment size={20} />
							<Text ml={2}>
								{post.comments.length}
							</Text>
						</Flex>
					</Flex>
            </Flex>
            <Image src={post.imageURL} width={"full"} height={"full"} objectFit={"contain"}/>
        </GridItem>
        
        <Modal isOpen={isOpen} onClose={onClose} isCentered
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
                {userProfile.uid === userLoggedIn.uid && (
                    <Button _hover={{color:"red"}} onClick={handleDelete} isLoading={isDeleting} bg={'transparent'}>
                    <MdDelete size={20} cursor={"pointer"}/>
                </Button>
                )}
            </Flex>
          </ModalHeader>
          <ModalBody bg={"#0E1514"} padding={0}>
                <Flex padding={0} width={"full"} gap={2}>
                    <Flex direction={"column"} overflow={"hidden"}  minHeight={{base:null,md:"400px"}} maxHeight={"500px"} maxWidth={{base:"100%", md:"50%"}}>
                        <Flex justifyContent={"center"} alignItems={"center"} height={"full"}>
                        <Image src={post.imageURL} height={"full"} objectFit={"contain"} objectPosition={"center"}/>
                        </Flex>
                        <Box display={{base:"block", md:"none"}}>
                            <FeedFooter post={post} isProfile={false} userProfile={userProfile}/>
                        </Box>
                    </Flex>
                    <Flex direction={"column"} display={{base:"none", md:"flex"}} width={"full"} p={4}>
                        <VStack justifyContent={"flex-start"} alignItems={"flex-start"} overflowY={"auto"} marginBottom={"auto"} maxH={"350px"}>
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
        </>
    )
}

export default ProfilePost