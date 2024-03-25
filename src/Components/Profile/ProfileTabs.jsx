import { Box, Flex, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import {BsBookmark, BsGrid3X3} from 'react-icons/bs'
import ProfilePosts from './ProfilePosts'

const ProfileTabs = ({isLoading}) => {
    return(
        <>
        <Tabs variant={"unstyled"}>
            <TabList justifyContent={"center"} gap={5}>
                <Tab>
                <Flex gap={1} cursor={"pointer"} padding={3} alignItems={"center"}>
                    <Box fontSize={18}>
                        < BsGrid3X3/>
                    </Box>
                    <Text>
                        Posts
                    </Text>
                </Flex>
                </Tab>
                <Tab>
                <Flex gap={1} cursor={"pointer"} padding={3} alignItems={"center"}>
                    <Box fontSize={18}>
                        <BsBookmark/>
                    </Box>
                    <Text>
                        Saved
                    </Text>
                </Flex>
                </Tab>
            </TabList>
            <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
            />
            <TabPanels>
            <TabPanel>
                {!isLoading && <ProfilePosts/>}
            </TabPanel> 
            </TabPanels>
        </Tabs>
         </>
    )
}

export default ProfileTabs