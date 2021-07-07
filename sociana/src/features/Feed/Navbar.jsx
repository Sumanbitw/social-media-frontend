import React, { useState } from 'react'
import { AvatarBadge, Box, Button } from "@chakra-ui/react"
import { Flex, Spacer } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { Input, InputRightAddon, InputGroup } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import { HStack } from "@chakra-ui/react"
import { FaHome } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from "react-router-dom"
import { logout } from '../user/userSlice'
import axios from 'axios'
import { API_URL } from '../../utility'
import { searchUser } from '../Profile/profileSlice'



function Navbar() {
    const [ text, setText ] = useState("")
    const [ results, setResults ] = useState([])
    const user = useSelector(state => state.user)
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()

    const handleLogout = () => {
        dispatch(logout())
        navigate(state?.from ?  state.from  : "/login", { replace : true })
    }



    const handleChange = async(e) => {
        const { value } = e.target 
        setText(value)
        try{
            // const result = await axios.get(`${API_URL}/search/${value}`)
            // console.log(result)
            await dispatch(searchUser(value))
            if(profile?.friend[0]?.name === value){
                navigate(`/profile/friend/${profile?.friend[0]?._id}`)
            }else{
                console.log("error")
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <Flex
        p={2}
        mb={4}
        position="sticky"
        top="0"
        zIndex="sticky"
        >
            <Box>
                <Heading as="h2" size="md" p={2} mx="3" color="gray.400">
                    Sociana
                </Heading>
            </Box>
            <Spacer/>
            <Box>
                <InputGroup>
                <Input
                name="search"
                value={text}
                onChange={handleChange}
                // onClick={() => navigate("/search")}
                placeholder="Search"
                />
                <InputRightAddon children={<SearchIcon/>}/>
                </InputGroup>
            </Box>
            <Spacer/>
            <HStack spacing={3} cursor="pointer">
                <Button onClick={handleLogout}>Logout</Button>
                <FaHome size={20}/>

                <Link to={`/profile/${user?.userLoggedIn?.name}`}>
                <Avatar 
                size="sm"
                name={user?.userLoggedIn?.name}
                src={user?.userLoggedIn?.profileImage}
                // onClick={navigate(`/profile/${user?.userLoggedIn?.name}`)}
                >
                    <AvatarBadge boxSize="1.25em" bg="green.500"/>
                </Avatar>
                </Link>
            </HStack>
            
        </Flex>

      
    )
}

export default Navbar
