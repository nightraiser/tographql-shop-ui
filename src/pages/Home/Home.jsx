import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Icon, Spin, Button, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { getRequest } from '../../services/ApiService';
import AddToCart from '../../components/AddToCart';
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';


const GET_PRODUCTS = gql`{
    products{
      _id
      title
      averageRating
      price
      image
      isWhishlisted
      cartId
    }
  }`;

export default function Home() {
    const { loading, data } = useQuery(GET_PRODUCTS);
    console.log('my gql data', data);

    return loading ? <Spin /> : (
        <div>
            <Row>
                { data.products.map(r => 
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
