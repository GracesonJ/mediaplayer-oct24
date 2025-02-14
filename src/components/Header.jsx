import {faVideo}  from '@fortawesome/free-solid-svg-icons/faVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar className="bg-transparent p-3">
        <Container>
          <Link to={"/"} style={{textDecoration:"none"}}>
            <Navbar.Brand>
              <h4 className='text-warning'><FontAwesomeIcon icon={faVideo} beat className='me-3' /> MEDIA PLAYER</h4>
            </Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </>
  )
}

export default Header