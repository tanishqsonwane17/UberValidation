import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../Context/UserContext'

const Usersignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const navigate = useNavigate() 
  const { user, setUser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault()

    const newUser = {
      fullname: {
        firstname,
        lastname
      },
      email,
      password
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`, 
        newUser
      )


      if (response.status === 200 || response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)

        navigate('/home') 
      }

    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message)
    }

    // Reset fields
    setEmail('')
    setPassword('')
    setFirstname('')
    setLastname('')
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img 
          className='w-16 mb-10' 
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
          alt="Uber Logo" 
        />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg mb-2 font-medium'>What's your name</h3>
          <div className='flex gap-4 mb-5'>
            <input 
              className='bg-[#eeeeee] rounded w-1/2 px-4 py-2 text-lg placeholder:text-base' 
              type="text" 
              required 
              placeholder='Firstname' 
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input 
              className='bg-[#eeeeee] rounded w-1/2 px-4 py-2 text-lg placeholder:text-base' 
              type="text" 
              required 
              placeholder='Lastname' 
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
          <input 
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-base' 
            type="email" 
            required 
            placeholder='example@gmail.com' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className='text-lg mb-2 font-medium'>Enter password</h3>
          <input 
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-base' 
            type="password" 
            required 
            placeholder='password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            type="submit" 
            className='bg-black text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'
          >
            Signup
          </button>

          <p className='text-center'>
            Already have an account?
            <Link to='/login' className='text-blue-600 ml-1'>Login</Link>
          </p>
        </form>
      </div>

      <div>
        <p className='text-[6px] pb-2 leading-tight'> 
          This site is protected by reCAPTCHA and the 
          <span className='underline'> Google privacy policy </span> and 
          <span className='underline'> terms of service apply.</span>
        </p>
      </div>
    </div>
  )
}

export default Usersignup
