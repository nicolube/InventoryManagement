import './../App.css';
import * as util from "./../util";
import { useEffect, useState } from 'react';
import Item from './item';
import AddItem from './ItemAddCard';
import { Row } from 'react-bootstrap';
import ItemEditor from './itemEditor';

function onAddToCart(e, quantity, id) {
  e.preventDefault()
  var items = util.cart.filter(item => item.id === id);
  if (items.length <= 0) {
    util.cart.push({ id: id, quantity: quantity });
  } else {
    items[0].quantity += quantity;
  }
  sessionStorage["cart"] = JSON.stringify(util.cart);
  return false
}

const ItemSite = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      setItems(await util.fetchItems())
    }

    getItems()
  })

  return (
    <div>
      <div>
        <div className="d-flex">
          <div className="space-between" />
          <button className="btn">{util.cart.length}</button>
        </div>
      </div>
        <Row>
            {items.map(item => <Item key={item.id} data={item}><AddItem data={item}onAddToCart={onAddToCart}/></Item>)}
            <ItemEditor/>
          </Row>
    </div>

  );
}

export default ItemSite;
