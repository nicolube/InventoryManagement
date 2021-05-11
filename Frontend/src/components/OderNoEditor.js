import React from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { X } from 'react-bootstrap-icons'


const OrderNoEditor = ({ selected = "-1", seller, onRemove, id }) => {
    return (
        <>
            <Form.Row>
                <InputGroup className="p-1">
                    <FormControl placeholder="Bestellnummer"/>
                    <Form.Control as="select">
                        <option value="-1">Wählen...</option>
                        {seller.map(s => <option selected={selected === s.id} value={s.id}>{s.name}</option>)}
                    </Form.Control>
                    <InputGroup.Append>
                        <Button variant="danger" onClick={(e) => onRemove(id)}><X /></Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Row>
        </>
    )
}

export default OrderNoEditor
