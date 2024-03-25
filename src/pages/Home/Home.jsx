import React from 'react'
import {Input, VStack, Button, Flex, Box, Text, Image, Container} from "@chakra-ui/react"
import Feed from '../../Components/Feed/Feed'
import SuggestedUsers from '../../Components/SuggestedUsers/SuggestedUsers'

const Home = () => {
    return(
        <Container minWidth={{base:"100%", md:"container.xl"}}>
            <Flex gap={20}>
                <Box flex={2}>
                    <Feed/>
                </Box>
                <Box flex={1} display={{base:"none", md:"block"}} mr={20} maxWidth={"300px"}>
                    <SuggestedUsers/>
                </Box>
            </Flex>
        </Container>
    )
}

export default Home