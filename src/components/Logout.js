import React from 'react'
import { useGetSignOutMutation} from '../features/usersAPI'
import { useDispatch } from 'react-redux';
import { deleteUser } from '../features/loggedSlice'
import {useNavigate} from 'react-router-dom'

const Logout = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [signOut] = useGetSignOutMutation()

    const handleNavigate = () => {
        navigate('/')
    }

    let user = JSON.parse(localStorage.getItem('userLogged'))

    const handleLogOut = async() => {
        try{
        let object = {
            logged: false,
            id: user.id,
        }
        await signOut(object)
        dispatch(deleteUser())
        handleNavigate()
        }catch(error){
        console.log(error);
        }
    }

  return (
    <>
        <button onClick={handleLogOut}><a>Logout</a></button>
    </>
  )
}

export default Logout