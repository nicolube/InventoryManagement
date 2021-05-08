import { Button, Container, Nav } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'

function header() {
    return (
        <header className="d-flex bg-dark text-white">
            <Container className="d-flex flex-wrap justify-content-center py-3 mb-4 align-items-center ">
                <div className="d-flex mb-lg-0 mb-3 mb-md-1 me-md-auto text-decoration-none">
                    <span className="fs-4">InventoryManager</span>
                </div>
                <Nav variant="pills">
                    <Nav.Link as={Link} to="/" active="true">Items</Nav.Link>
                    <Nav.Link as={Link} to="/checkout" >Card</Nav.Link>

                </Nav>
                <div className="text-end">
                    <Link to="/login"><Button>Login</Button></Link>
                </div>
            </Container>
        </header>
    )
}

export default header
