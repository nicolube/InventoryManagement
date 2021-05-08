import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { CartPlus } from 'react-bootstrap-icons'

const AddItem = ({ data, onAddToCart }) => {
    const [quantity, setQuantity] = useState(data.std_restock)
    return (
        <>
            <Button className="btn" variant="secondary">Edit</Button>
            <Form onSubmit={(e) => onAddToCart(e, quantity, data.id)}>
                <div className="d-inline-flex h-100 align-items-center flex-row-reverse">
                    <Button className="ml-2" type="submit" ><CartPlus /></Button>
                    <Form.Control className="w-25 float-right" type="number" defaultValue={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
            </Form>
        </>
    )
}

export default AddItem
