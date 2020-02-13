import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Icon, Spin, Button, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { getRequest } from '../../services/ApiService';
import AddToCart from '../../components/AddToCart';
export default function Home() {
    const [loading, setloading] = useState(true);
    const [list, setlist] = useState([]);

    useEffect(() => {
        getRequest('/products').then(res => {
            setlist(res);
            setloading(false);
        });
       
    }, []);

    return loading ? <Spin /> : (
        <div>
            <Row>
                { list.map(r => 
                   (
                       <Col span={4} style={{marginBottom: "10px"}}>
                         <Card
                            hoverable
                            cover={<img style={{height: "300px"}} alt="example" src={r.image} />}
                            actions={[
                                <AddToCart productId={r._id} cartId={r.cartId} isWhishlisted={r.isWhishlisted}/>,
                                <Link to={`/details/${r._id}`}>
                                    <Button type="primary" icon="swap">Details</Button>
                                </Link>,
                              ]}
                        >
                            <Card.Meta title={r.title} />
                            <Rate value={r.averageRating} disabled />
                            <h3>Rs {r.price}</h3>
                        </Card>
                       </Col>
                   )
                )}
            </Row>
        </div>
    )
}
