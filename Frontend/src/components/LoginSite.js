import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const LoginSite = () => {
    const [mailError, setMailError] = useState(false)
    const [passwordError, setPassowordError] = useState(false)

    return (
        <Row>
            <Col>
                <Card className="mx-auto col-12 mt-4 col-lg-6 col-md-8 col-xl-4" >
                    <Form className="p-4">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-danger" hidden={!mailError}>
                                Unknowen E-Mail!
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            <Form.Text className="text-danger" hidden={!passwordError}>
                                Unknowen password!
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Save Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card>

            </Col>
        </Row>
    )
}

export default LoginSite
