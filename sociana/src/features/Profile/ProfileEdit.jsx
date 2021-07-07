import React, { useState } from 'react'
import { Input, Button } from "@chakra-ui/react" 
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './profileSlice'
import { useLocation, useNavigate } from 'react-router'

function ProfileEdit() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    const [ inputValues, setInputValues] = useState({ user : user.user[0]._id ,name : "", bio : ""}) 

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await dispatch(updateUser(inputValues))
            console.log(response)
            if(response.status === 200){
                navigate(state?.form ? state.from : `/profile/${inputValues.name}`)
            }else{
                console.log("error")
            }
        }catch(error){
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setInputValues(inputValues => {
            inputValues[event.target.name] = event.target.value
            return{...inputValues}
        })
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <Input
            type="text"
            name="name"
            value={inputValues['name']}
            onChange={handleChange}
            placeholder="Edit Name"/>
        
            <Input
            type="text"
            name="bio"
            value={inputValues['bio']} 
            onChange={handleChange}
            placeholder="Edit Bio"/>

            <Button type="submit">
                Edit
            </Button>
        </form>
        </>

    )
}

export default ProfileEdit
