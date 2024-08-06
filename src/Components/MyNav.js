import React from 'react'
import {
  Container,
  Navbar,
  Nav,
  Button,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useUser } from '../Providers/UserProvider'

const MyNav = () => {
  const nav = useNavigate()
  const { logout } = useUser()
  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        className='bg-body-tertiary navbar-wave '
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}
      >
        <Container>
          <Navbar.Brand className='cursor-pointer'>
            Soft Enterprise
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'></Nav>
            <Nav>
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip id='tooltip'>Signout</Tooltip>}
              >
                <Nav.Link
                  className='me-3 custom-hover btn p-2'
                  onClick={() => {
                    logout()
                  }}
                >
                  Signout
                </Nav.Link>
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default MyNav
