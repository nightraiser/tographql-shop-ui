import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Icon, Spin, Button, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { getRequest } from '../../services/ApiService';
import {postRequest } from '../../services/ApiService';
export default function Cart() {
    const [loading, setloading] = useState(true);
    const [list, setlist] = useState([]);

    useEffect(() => {
        getRequest('/mycart').then(res => {
            setlist(res);
            setloading(false);
        });
       
    }, []);

    const handleDelete = async (cId) => {
        await postRequest('/removeCart', {cId});
        setlist(list.filter(r => r._id !== cId));
    }

    return loading ? <Spin /> : (
        <div>
            <Row>
                { list.length === 0 ? <h3>Nothing in cart, do some shopping</h3> : list.map(({_id, item}) => 
                   (
                       <Col span={4} style={{marginBottom: "10px"}}>
                         <Card
                            hoverable
                            cover={<img style={{height: "300px"}} alt="example" src={item.image} />}
                            actions={[
                                <Button onClick={() => handleDelete(_id)} icon="delete" type="danger">Remove</Button>,
                                <Link to={`/details/${item._id}`}>
                                    <Button type="primary" icon="swap">Details</Button>
                                </Link>,
                              ]}
                        >
                            <Card.Meta title={item.title} />
                            <Rate value={item.averageRating} disabled />
                            <h3>Rs {item.price}</h3>
                        </Card>
                       </Col>
                   )
                )}
            </Row>
        </div>
    )
}
