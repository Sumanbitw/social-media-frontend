import { Avatar, Center } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { fetchUser, getUser } from './profileSlice'
import { GrEdit } from "react-icons/gr" 

function Profile() {
    const profile = useSelector(state => state.profile)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {username} = useParams()
    console.log(username)

    useEffect(() => {
        (async function getUserDetails(){
            await dispatch(getUser(user?.user[0]?._id))
        })()
    },[user?.user, dispatch])



    return (
        <>
        <Center>
            <Avatar
            m={5}
            name={user?.user[0]?.name}
            src={user?.user[0]?.profileImage}
            />
            <Text as="h1">
                {user?.user[0]?.name}
            </Text>
            <Text>Bio : {user?.user[0]?.bio}</Text>
            <Text>
                Followers : {user?.user[0]?.followers?.length}
            </Text>
            <Text>
                Followings : {user?.user[0]?.followings?.length}
            </Text>
            <Link to={`/profile/${user?.user[0]?.name}/edit`}>
            <GrEdit/>
            </Link>
        </Center>
        </>
    )
}

export default Profile
