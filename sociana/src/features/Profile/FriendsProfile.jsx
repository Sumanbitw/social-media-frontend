import { Avatar, Box, Center, Text, Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchUserFriends } from '../Feed/feedSlice'
import { followUser, getUser, getUserFriends, getUserProfileByUserName, searchUser, unFollowUser } from './profileSlice'

function FriendsProfile() {
    const user = useSelector(state => state.user)
    const feed = useSelector(state => state.feed)
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const { userId }  = useParams()


    const isUserFollowed = profile?.friend[0]?.followers?.find(item => item === user?.user[0]?._id)
    

    const handleFollow = async(e) => {
        e.preventDefault()
        await dispatch(followUser({
            user : {
                profileId : userId,
                userId : user?.user[0]?._id
            }
        }))
    }

    const handleUnfollow = async(e) => {
        e.preventDefault()
        await dispatch(unFollowUser({
            user : {
                profileId : userId,
                userId : user?.user[0]?._id
            }
        }))
    }

    

    return (
        <>
        <Box >
            <Center d="flex" flexDirection="column" alignItems="center">
                <Avatar
                name={profile?.friend[0]?.name}
                src={profile?.friend[0]?.profileImage}
                />
                <Text>
                    {profile?.friend[0]?.name}
                </Text>
                <Text>
                    {profile?.friend[0]?.bio}
                </Text>
                <Text>
                    {profile?.friend[0]?.city}
                </Text>
                <Text>
                    {profile?.friend[0]?.description}
                </Text>
                <Text>
                   Followers :  {profile?.friend[0]?.followers?.length}
                </Text>
                <Text>
                    Followings : {profile?.friend[0]?.followings?.length}
                </Text>
                {isUserFollowed
                ? <Button onClick={handleUnfollow}>
                    Unfollow
                 </Button>
                : <Button onClick={handleFollow}>
                    Follow  
                  </Button>
                }
            </Center>
        </Box>
        </>
    )
}

export default FriendsProfile
