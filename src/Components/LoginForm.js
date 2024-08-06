import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useLoginMutation } from '../API/GlobalAPI'
import toast from 'react-hot-toast'
import UserProvider, { useUser } from '../Providers/UserProvider'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()
  const [login, results] = useLoginMutation()
  const { login: setLogin } = useUser()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    login({ input: formData })
  }
  useEffect(() => {
    if (results.isError) {
      toast.error(`${results.error.data.msg}`, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
    } else if (results.isSuccess) {
      const decodedToken = jwtDecode(results.data.token)

      localStorage.setItem('Authorization', results.data.token)
      const userId = decodedToken.user.id

      setLogin({ id: userId })
      navigate('/product')

      toast.success('Login Successfull', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
    }
  }, [results])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          name='email'
          value={formData.email}
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          name='password'
          value={formData.password}
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Button
        variant='primary'
        type='submit'
        className='w-100 mt-3'
        disabled={results.isLoading}
      >
      {results.isLoading ? "Signing In..." : "Sign In"}
      </Button>
    </Form>
  )
}

export default LoginForm
