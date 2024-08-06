import React from 'react'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import LoginForm from '../Components/LoginForm'

const LoginPage = () => {
  return (
    <Container className='d-flex justify-content-center align-items-center vh-100'>
      <Card className='w-75 rounded-3 shadow bg-white'>
        <Card.Body>
          <Row>
            <Col md={7} className='d-flex flex-column justify-content-center'>
              <h2 className='text-center mb-4'>Login</h2>
              <LoginForm />
            </Col>
            <Col
              md={5}
              className='d-flex justify-content-center align-items-center'
            >
              <div className='text-center'>
                <h3>Welcome Back!</h3>
                <p>Sign in to continue</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LoginPage
