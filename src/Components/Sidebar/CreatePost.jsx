import { Box, Flex, Tooltip, useDisclosure, Input, Textarea, Button, Image } from "@chakra-ui/react";
import { CreatePostLogo } from "../../Assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useState } from "react";
import { useRef } from "react";
import useImage from "../../hooks/useImage";
import useCreatePost from "../../hooks/useCreatePost";
import { useLocation } from "react-router-dom";

const CreatePost = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [caption, setCaption] = useState("")
	const ImgRef = useRef(null)
	const {ImageSelect, selectedFile, setSelectedFile} = useImage()
	const location = useLocation()
	const {pathname} = location;
	const {isUpdating, createPostFunc} = useCreatePost(pathname)


	const handleCaptionChange = (e) =>{
		let captionValue = e.target.value
		setCaption(captionValue)
	}
	return (
		<>
		<Tooltip
			hasArrow
			label={"Create Post"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Flex
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
				cursor={"pointer"}
				onClick={onOpen}
			>
				<CreatePostLogo />
				<Box display={{ base: "none", md: "block" }}>Create</Box>
			</Flex>
		</Tooltip>

		<Modal isOpen={isOpen} onClose={() => {setCaption(""); onClose()}} size='xl'>
		<ModalOverlay />

		<ModalContent bg={"black"} border={"1px solid gray"}>
			<ModalHeader>Create Post</ModalHeader>
			<ModalCloseButton />
			<ModalBody pb={6}>
			<BsFillImageFill
					style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
					size={16}
					onClick={()=>ImgRef.current.click()}
				/>
				<Textarea placeholder='Post caption...' onChange={handleCaptionChange} value={caption}/>

				<Input type='file' hidden ref={ImgRef} onChange={(e) => ImageSelect(e)}/>

				{selectedFile && <>
					<Flex width={"full"} justifyContent={"center"}>
						<Image src={selectedFile} />
					</Flex>
				</>}
			</ModalBody>

			<ModalFooter>
				<Button mr={3} onClick={async() => {await createPostFunc(selectedFile,caption); setCaption(""); setSelectedFile(null)
			onClose();}} isLoading={isUpdating}>Post</Button>
			</ModalFooter>
		</ModalContent>
		</Modal> 
	</>
	);
};

export default CreatePost;