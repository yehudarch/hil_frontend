import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from './App'
import { loginFormSubmit } from './client'


const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const nav = useNavigate()

    const {setIsLogged, setToken} = useContext(AppContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await loginFormSubmit(username, password)
        
        if (res) {
            setToken(localStorage.getItem('app_token'))
            // console.log(res);
            // alert('User logged successfuly')
            setIsLogged(true)
            nav('/')

        }else{
            alert('User NOT LOGGED IN!!!')
        }

    }

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center"}}>
        <h4 style={{display: 'flex', justifyContent: 'center'}}>Login</h4>
        <div className="container d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => {setUsername(e.target.value)}} required value={username} placeholder='Username' className="form-control"/><br/>
                <input onChange={(e) => {setPassword(e.target.value)}} required value={password} type='password' placeholder='Password' className="form-control"/><br/>
                <input type="submit" className="btn btn-primary" value='Login' disabled={! (password.length > 0 && username.length > 0)}/>
                <br/>
                <br/>
            </form>
        </div>
        <div style={{display: 'flex', gap: '5px', justifyContent: 'center'}}>
            <p>You don't have an account?</p>
            <p><Link to='/signup'>Signup</Link></p>
        </div>
    </div>
  )
}

export default LoginForm