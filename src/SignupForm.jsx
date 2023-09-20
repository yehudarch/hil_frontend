import React, { useState } from 'react'
import { signupFormSubmit } from './client'
import { Link, useNavigate } from 'react-router-dom'

const SignupForm = ({setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [email, setEmail] = useState('')

    // const handleSubmit = (event) => {
    //     console.log(name);
    //     console.log(telephone);
    //     console.log(email);
    //     console.log(content);
    // }
    const handleSubmit = async (e) => {
        e.preventDefault() //if not it will use local url and method GET

        console.log(username);
        console.log(password);
        console.log(email);
        if (password === password2) {
            console.log('Password varified!');
            const res = await signupFormSubmit(username, password, email)

            if (res) {
                setToken(localStorage.getItem('app_token'))

            }
        } else {
            console.log('Passwords not identical!');
            alert('Passwords not identical!')
            return
        }
    }


    return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <h4 style={{display: 'flex', justifyContent: 'center'}}>Create an Acount</h4>
        <div className="container d-flex justify-content-center align-items-center">

    {/* <div> */}
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => {setUsername(e.target.value)}} required value={username} placeholder='Username'  className="form-control"/><br/>
                <input onChange={(e) => {setPassword(e.target.value)}} required value={password} type='password' placeholder='Password'  className="form-control"/><br/>
                <input onChange={(e) => {setPassword2(e.target.value)}} required value={password2} type='password' placeholder='Confirm Password'  className="form-control"/><br/>
                {password !== password2 && <p style={{color: 'red'}}>Passwords are not identical!</p>}
                <input onChange={(e) => {setEmail(e.target.value)}} required value={email} type='email' placeholder='Email' className="form-control"/><br/>
                <input type="submit" className="btn btn-primary" value='Signup' disabled={! (password === password2 && username.length > 0)}/>

                {/* <input type="submit"/> */}
                {/* <input type="submit" value='OK' disabled={! (password === password2 && username.length > 0)}/> */}

                {/* <button onClick={() => contactFormSubmit(store_id)}>Send</button> */}
                <br/>
                <br/>
            </form>
        </div>
        <div style={{display: 'flex', gap: '5px', justifyContent: 'center'}}>
            <p>You don't have an account?</p>
            <p><Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}

export default SignupForm