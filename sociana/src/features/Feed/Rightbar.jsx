import React, { useEffect, useState } from 'react'
import { AvatarBadge, Box } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserFriends } from './feedSlice'
import { Link } from "react-router-dom"
// import { fetchUser } from '../user/userSlice'

function Rightbar() {
    // const [userFriends, setUserFriends] = useState([])
    const user = useSelector(state => state.user)
    const feed = useSelector(state => state.feed)
    const dispatch = useDispatch()

    console.log(feed.friends)

    useEffect(() => {
        if(user.userLoggedIn !== null){
            (async function(){
                const response = await dispatch(fetchUserFriends(user?.user[0]?._id))
                console.log(response)
    
            })()
        }
    },[dispatch, user.userLoggedIn, user?.user])
    return (
        <>
        <Box h="lg" w="40%">
            <Heading>
                Online Friends
            </Heading>
            
                {feed?.friends.map(friend => (
                    <>
                    <Flex key={friend._id}>  
                    <Avatar 
                        size="sm"
                        name={friend?.name}
                        src={friend?.profileImage}
                        >
                    <AvatarBadge boxSize="1.25em" bg="green.500"/>
                </Avatar>
                    
                    <Text>{friend?.name}</Text>
                    </Flex> 
                    </>
                ))}
        </Box>
        </>
    )
}

export default Rightbar
