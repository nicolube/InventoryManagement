import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { CartPlus } from 'react-bootstrap-icons'

const AddItem = ({ data, onAddToCart }) => {
    const [quantity, setQuantity] = useState(data.std_restock)
    return (
        <div className="d-flex ml-auto ">
            <Button className="btn" variant="secondary">Edit</Button>
            <Form className="flex-shrink-0 ml-auto" onSubmit={(e) => onAddToCart(e, quantity, data.id)}>
                <Form.Row className="ml-2 h-100 ">
                    <Col xs="auto"><Form.Control type="number" defaultValue={quantity} onChange={(e) => setQuantity(e.target.value)} /></Col>
                    <Col xs="auto"><Button type="submit" ><CartPlus /></Button></Col>
                    </Form.Row>
            </Form>
        </div>
    )
}

export default AddItem
