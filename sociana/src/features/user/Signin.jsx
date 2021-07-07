import React, { useEffect, useState } from 'react'
import { Box, Center, VStack } from "@chakra-ui/react"
import { Text, Input } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
  } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { fetchUser, login } from './userSlice'
import { useLocation, useNavigate } from 'react-router'
import { fetchTimelinePost, fetchUserFriends } from '../Feed/feedSlice'

function Signin() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    const [ inputValues, setInputValues ] = useState({ email : "", password : ""})

    
    useEffect(() => {
        (async function (){
            if(user.userLoggedIn){
                try{
                    await dispatch(fetchTimelinePost(user?.user[0]?._id))
                    navigate(state?.from ? state.from : "/", { replace : true })
                }catch(error){
                    console.log(error)
                }

            }
        })()
    },[user.userLoggedIn, dispatch, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await dispatch(login(inputValues))
            console.log(response)
            if(!response.error){
                navigate("/")
            }else{
                console.log("Wrong credentials")
            }
            
        }catch(error){
            console.log(error)
        }
    }
    function handleInput(event){
        setInputValues(inputValues => {
             inputValues[event.target.name] = event.target.value 
            return {...inputValues }
        })
       
    }
    return (
        <>
        <Center alignItems="center" padding={10}>
            <Box 
            boxShadow="2xl"
            minWidth={['90vw', '600']}
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            >
                <Box textAlign="center">
                    <Heading  as="h3" size="lg">
                        Sign In
                    </Heading>
                </Box>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={7}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input 
                            type="email" 
                            name="email"
                            values={inputValues['email']}
                            onChange={handleInput}
                            />
                        </FormControl>
                        
                        <FormControl id="password" >
                            <FormLabel>Password</FormLabel>
                            <Input 
                            type="password" 
                            name="password"
                            values={inputValues['password']}
                            onChange={handleInput}
                            />
                        </FormControl>

                        <Button 
                        colorScheme="teal" 
                        size="lg" 
                        width="full"
                        type="submit"
                        >
                            Sign In
                        </Button>

                        <Text>
                            Don't have an account ? {" "}
                            <Button 
                            colorScheme="teal" 
                            variant="link"
                            onClick={() => navigate("/signup")}
                            >
                                Sign up
                            </Button>
                        </Text>
                    </VStack>
                </form>
                 
            </Box>
        </Center>
        </>
    )
}

export default Signin
