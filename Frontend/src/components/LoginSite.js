import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { fetchFromBackend } from '../util'
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom';


const LoginSite = ({setLogin}) => {
    const [mailError, setMailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [saveLogin, setSaveLogin] = useState(false)
    const history = useHistory()

    const handleLogin = async (e) => {
        e.preventDefault()
        const res = await fetchFromBackend("auth", "POST", {
            name: username,
            password: password
        })
        if (res.status !== 200) return
        const data = await res.json()
        if (data.code) {
            setMailError(false)
            setPasswordError(false)
            if (data.code === "E_INVALID_USER") {
                setMailError(true)
            } else if (data.code === "E_INVALID_PASSWORD") {
                setPasswordError(true)
            } else if (data.code === "A_AUTH") {
                if (saveLogin) Cookies.set("token", data.token, {secure: true, expires: 30, sameSite: 
                    'Strict'})
                sessionStorage["token"] = data.token
                setLogin(true)
                history.push("/")
            }
            return
        }
    }

    return (
        <Row>
            <Col>
                <Card className="mx-auto col-12 mt-4 col-lg-6 col-md-8 col-xl-4" >
                    <Form className="p-4" onSubmit={(e) => handleLogin(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <Form.Text className="text-danger" hidden={!mailError}>
                                Unknowen E-Mail!
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Form.Text className="text-danger" hidden={!passwordError}>
                                Unknowen password!
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Save Password" value={saveLogin} onChange={(e) => setSaveLogin(e.target.value)} />
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
