import { Box, Flex, Tooltip, useDisclosure, FormControl, FormHelperText, FormLabel,Input, Button, Text } from "@chakra-ui/react";
import { SearchLogo } from "../../Assets/constants";
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
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [userSearch, setUserSearch] = useState("")
	const {isUpdatingSearch, userSearched, getProfile, setUserSearched} = useSearchUser()

	const handleChange = (e) => {
		setUserSearch(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		getProfile(userSearch)
	}

	return (
		<>
		<Tooltip
			hasArrow
			label={"Search"}
			placement='right'
			ml={1}
			openDelay={300}
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
				onClick={onOpen}
				cursor={"pointer"}
			>
				<SearchLogo />
				<Box display={{ base: "none", md: "block" }}>Search</Box>
			</Flex>
		</Tooltip>

		<Modal isOpen={isOpen} onClose={()=>{setUserSearch(""); setUserSearched(""); onClose()}} motionPreset="slideInLeft">
			<ModalOverlay/>
			<ModalContent bg={"black"} border={"1px solid"} borderColor={" blue.800"}>
				<ModalCloseButton/>
				<ModalBody>
					<form onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>Username</FormLabel>
						<Input type="text" name="username" value={userSearch} onChange={handleChange} placeholder="Search"/>
						<FormHelperText>Enter the exact username</FormHelperText>
					</FormControl>
					<Flex mb={4}> 
					<Button type="submit" mt={2} width={"full"} isLoading={isUpdatingSearch}>
						Search
					</Button>
					</Flex>
					</form>
					{userSearched &&
					<>
					<SuggestedUser username={userSearched} setUserSearched={setUserSearched} onClose={onClose}/>
					</>}
				</ModalBody>
			</ModalContent>
		</Modal>
	</>
	);
};

export default Search;