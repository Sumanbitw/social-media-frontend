import { Avatar, Center,Box, Flex, Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { fetchUser, getUser, getUserProfileByUserName } from './profileSlice'
import { GrEdit } from "react-icons/gr" 

function Profile() {
    const profile = useSelector(state => state.profile)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {username} = useParams()
    console.log(profile.posts)

    useEffect(() => {
        (async function getUserDetails(){
            await dispatch(getUser(user?.user[0]?._id))
        })()
    },[user?.user, dispatch])


    useEffect(() => {
        (async function getUser(){
            await dispatch(getUserProfileByUserName(user?.user[0]?.name))
        })()
    }, [])
    return (
        <>
        <Box
        marginLeft="64"
        width="container.sm"
        textAlign="center" 
        >
            <Box
            >
            <Avatar
            m={5}
            name={user?.user[0]?.name}
            src={user?.user[0]?.profileImage}
            />
            </Box>
            <Flex 
            flexDirection="column" 
            alignItems="flex-start"
            mt="10"
            p="10"
            >
            <Text as="h1">
                {user?.user[0]?.name}
            </Text>
            <Text>Bio : {user?.user[0]?.bio}</Text>
            <Text>
                {user?.user[0]?.followers?.length} followers
            </Text>
            <Text>
                {user?.user[0]?.followings?.length} followings
            </Text>
            </Flex>
            <Link to={`/profile/${user?.user[0]?.name}/edit`}>
            <GrEdit size={25}/>
            </Link>

            {profile.posts && profile.posts.map(post => (
                <>
                <Box
                p="6" 
                h={64} 
                mt="5" 
                px="8" 
                py="9" 
                display="flex" 
                flexDirection="column" 
                justifyContent="space-between" 
                boxShadow="lg"
                key={post._id}
                >
                    <Text>
                        {post.text}
                    </Text>
                    <Button
                    w={32}
                    >
                        {post?.likes?.length} likes
                    </Button>
                </Box>
                </>
            ))}
        </Box>
        </>
    )
}

export default Profile
