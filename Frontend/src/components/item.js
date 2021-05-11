import { Card,  Row } from 'react-bootstrap'

const Item = ({ data, children }) => {
    return (
        <Row className="mt-1">
            <Card>
                <div className="d-flex mt-1">
                    <p>{data.name}</p>
                    {children}
                </div>
                <div className="d-flex">
                    {data.order_nos.map(item =>
                        <div className="orderNr" key={item.id}>
                            <small>{item.seller.name}: {item.nr}</small>
                        </div>)}
                </div>
            </Card></Row>
    )
}

export default Item
