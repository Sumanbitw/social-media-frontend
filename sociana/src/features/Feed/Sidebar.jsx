import React from 'react'
import { 
    List, 
    ListItem, 
    ListIcon, 
} from "@chakra-ui/react"
import { MdRssFeed } from "react-icons/md"
import { BsChatSquareDots } from "react-icons/bs"
import { MdExplore } from "react-icons/md"
import { IoIosNotificationsOutline } from "react-icons/io"
import { FiMoreHorizontal } from "react-icons/fi"
import { Box, VStack } from "@chakra-ui/react"

function Sidebar() {
    return (
        <>
        <VStack spacing={10}>
        <Box 
        h="100vw" 
        p="5" 
        w={60} 
        position="fixed"
        left="0.5"
        boxShadow="md"
        >
        <List spacing={3} p="5" cursor="pointer">
            <ListItem mt={5} fontSize="20" fontWeight="bold">
                <ListIcon as={MdRssFeed} color="green.700" size={30}/>
                Feed
            </ListItem>
            
            <ListItem fontSize="20" fontWeight="bold">
            <ListIcon as={BsChatSquareDots} color="green.700" />
                Messages
            </ListItem>
            
            <ListItem fontSize="20" fontWeight="bold">
                <ListIcon as={MdExplore} color="green.700"/>
                Explore  
            </ListItem>
            
            <ListItem fontSize="20" fontWeight="bold">
                <ListIcon as={IoIosNotificationsOutline} color="green.700"/>
                    Notifications
                </ListItem>

            <ListItem fontSize="20" fontWeight="bold">
                <ListIcon as={FiMoreHorizontal} color="green.700"/>
                More  
            </ListItem>
        </List>
        </Box>
        </VStack>
        </>
    )
}

export default Sidebar
