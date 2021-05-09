import { useState, useEffect } from 'react'
import * as util from '../util'
import { Row } from 'react-bootstrap';
import Item from './item';


const CheckoutSite = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const updateCart = async () => {
            var data = await util.fetchCart();
            data.map(i => i["quantity"] = util.cart.filter(e => i["id"] === e["id"]));
            console.log(data)
            setCart(data);
        }
        updateCart()
    })

    return (
        <div>
        <Row>
            {cart.map(item => <Item key={item.id} data={item} ></Item>)}
        </Row>
        </div>
    )
}

export default CheckoutSite
