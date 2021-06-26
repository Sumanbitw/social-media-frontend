import React, { useState } from 'react'
import { Box, Center, VStack } from "@chakra-ui/react"
import { Text, Input } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
  } from "@chakra-ui/react"
// import { login } from './userSlice'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { API_URL } from '../../utility'

function Signup() {
    const navigate = useNavigate()
    const [ inputValues, setInputValues ] = useState({ name : "", email : "", password : ""})
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(`${API_URL}/auth/signup`, inputValues)
            console.log(response)
            if(response.status === 201 ){
                navigate("/login")
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
                        Sign Up
                    </Heading>
                </Box>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={7}>
                    <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input 
                            type="name" 
                            name="name"
                            values={inputValues['name']}
                            onChange={handleInput}
                            />
                        </FormControl>

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
                            Already have an account ? {" "}
                            <Button 
                            colorScheme="teal" 
                            variant="link"
                            onClick={() => navigate("/login")}
                            >
                                Sign in
                            </Button>
                        </Text>
                    </VStack>
                </form>
                 
            </Box>
        </Center>
        </>
    )
}

export default Signup
