import {Image, Flex, Box} from "@chakra-ui/react";
import React from "react";

const GoogleAuth = () => {
    return(
        <Flex alignItems={'center'} justifyContent={'center'} gap={3}>
                <Image src="/google.png" w={5} />
                <Box fontSize={14} color="blue.500" cursor={"pointer"}>
                    Log in with Google
                </Box>
            </Flex>
    )
}

export default GoogleAuth