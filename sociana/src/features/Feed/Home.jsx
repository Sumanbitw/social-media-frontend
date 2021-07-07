import React from 'react'
import Rightbar from "./Rightbar"
import Feed from "./Feed"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { Flex } from '@chakra-ui/react'


function Home() {
    return (
        <>
        <Navbar/>
        <Flex alignItems="flex-start">
            <Sidebar/>
            <Feed/>
            <Rightbar/>
        </Flex>
        
        </>
    )
}

export default Home
