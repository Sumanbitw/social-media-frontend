import { Box } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { Textarea, Text } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { FaImages, FaVideo } from 'react-icons/fa';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost, fetchTimelinePost, fetchUserFriends, fetchUserPost, likesUpdate } from './feedSlice'
import { fetchUser } from '../user/userSlice'
import { Link } from "react-router-dom"

function Feed() {
    const user = useSelector(state => state.user)
    const feed = useSelector(state => state.feed)
    const [postContent, setPostContent] = useState("")
    const dispatch = useDispatch()

    // console.log(user.user[0]._id)
    console.log(feed.friends)
    
    // const getUserNameFromId = (userId) => {
        
    //     console.log(feed?.friends.find(friendObj => friendObj._id === userId))

    //     // return feed?.friends.find(friendObj => friendObj._id === userId)?.name
    // }

    useEffect(() => {
        if(user.userLoggedIn !== null){
            (async function(){
                const response = await dispatch(fetchUserFriends(user?.user[0]?._id))
                console.log(response)
    
            })()
        }
    },[dispatch, user.userLoggedIn, user?.user])

    const handleNewPost = (event) => {
        setPostContent(event.target.value)
    }

    const validatePost = (postContent) => {
        if(postContent === "") {
            return false
        }
        return true
    }

    const handlePost = () => {
        if(!validatePost(postContent)){
            console.log("Cannot post empty post")
            return;
        }
        dispatch(addNewPost(
            { post : 
                { 
                user : user.user[0]._id, 
                text : postContent, 
                image : "", 
                likes : [] 
            }
        }
        ))
        setPostContent("")
    }

    const handleLikes = (postId) => {
        console.log(postId)
        dispatch(likesUpdate(
            {
                post : 
                {
                    postId : postId,
                    user : user.user[0]._id
                }
            }
        ))
    }

    useEffect(() => {
        if(user.userLoggedIn !== null){
            (async function(){
                try{
                    const result = await dispatch(fetchTimelinePost(user.user[0]._id))
                    //  await dispatch(fetchUserPost(user?.userLoggedIn?.name)) 
                    // await dispatch(fetchUserFriends())
                   console.log(result)
                }catch(error){
                    console.log(error)
                }
            })()
        }
        return () => {}
    },[])


    return (
        <>
        <Box 
        marginLeft="64"
        width="container.sm">
            <Flex alignContent="center" justifyContent="center">
                <Link to={`/profile/${user?.user[0]?.name}`}>
                <Avatar
                m={5}
                name={user.user[0].name}
                src={user.user[0].profileImage}
                />
                </Link>
                <Textarea
                mt={5}
                mr={2}
                size="sm"
                placeholder="What's your thoughts for today ?"
                value={postContent}
                onChange={handleNewPost}
                />
            </Flex>

            <Flex>
                <Button ml={5} mt={3}>
                    <FaImages/>
                    <Text ml={2}>Images</Text>
                </Button>

                <Button ml={5} mt={3}>
                    <FaVideo/>
                    <Text ml={2}>Videos</Text>
                </Button>

                <Button ml={5} mt={3} onClick={handlePost}>
                    Post
                </Button>
            </Flex>
            {feed && feed.posts.map(post => (
                // console.log(post)
                <>
                <Box 
                p="6" 
                h={64} 
                mt="5" 
                px="8" 
                py="9" 
                d='flex' 
                flexDirection="column" 
                justifyContent="space-between" 
                boxShadow="lg"
                key={post._id} 
                >
                    {/* <Text>{` Name : ${feed.friends && getUserNameFromId(post.user)}`}</Text> */}
                    <Text>{post?.text}</Text>
                    <Button 
                    w={32}
                    onClick={() => handleLikes(post._id)}
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

export default Feed
