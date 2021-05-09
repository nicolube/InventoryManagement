import React, { useEffect, useState } from 'react'
import { Col, Form, InputGroup, Button, Modal, FormControl } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { fetchSellers } from '../util'

import OrderNoEditor from './OderNoEditor'

var index = 0

const ItemEditor = ({ data = null, onClose, onSave, show = false }) => {
    const [sellers, setSellers] = useState([])
    const [orderNums, setOderNums] = useState([])
    useEffect(() => {
        if (show === true) {
            const updateSellers = async () => setSellers(await fetchSellers())
            if (sellers.length === 0) updateSellers()
        }
    })

    const handleAddOrderNr = () => {
        if (orderNums.length < sellers.length) {
            setOderNums([...orderNums, { key: index }])
            index++
        }
    }
    const handleRemoveOrderNr = (key) => {
        setOderNums(orderNums.filter(e => e.key !== key))
    }

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Teil Editor
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="p-4">
                    <Form.Row className="align-items-center">
                        <Col xs="7">
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl placeholder="Name" />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Mänge</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="number" />
                            </InputGroup>
                        </Col>
                    </Form.Row>
                    <Form.Row className="align-items-center mt-2">
                        <Col xs="8">
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Lagerplatz</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Fach</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="number" />
                            </InputGroup>
                        </Col>
                    </Form.Row>
                    <Form.Row className="mt-3 mb-2 pb-2 border-bottom border-dark">
                        <Col>
                            <Form.Label>Bestellnummern</Form.Label>
                        </Col>
                        <Col>
                            <Button onClick={handleAddOrderNr} className="float-right" variant="success"><Plus /></Button>
                        </Col>
                    </Form.Row>
                    <div>
                        {orderNums.map(e => <OrderNoEditor id={e.key} nr={e.nr} selected={e.id} seller={sellers} onRemove={handleRemoveOrderNr} />)}
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={onSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ItemEditor
