import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Spin, Rate } from 'antd'
import Review from '../../components/Review';
import { getRequest } from '../../services/ApiService';
import { useParams } from 'react-router-dom';
import AddToCart from '../../components/AddToCart';


const reviews = [
    {
        reviewerName: 'Sai',
        comments: 'Hello',
        rating: 5,
        createdOn: new Date().getTime()
    }
]
export default function Details({ history }) {

    const [loading, setloading] = useState(true);
    const [data, setdata] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        getRequest(`/product/${id}`).then(res => {
            console.log(res);
            setdata(res);
            setloading(false);
        });
       
    }, []);

    return loading ? <Spin /> : (
        <Row>
            <Col span={4}>
                <Card actions={[
                    <AddToCart productId={data._id} cartId={data.cartId} isWhishlisted={data.isWhishlisted} />
                ]} >
                <img height="300px" alt="example" src={data.image} />
                </Card>
            </Col>
            <Col style={{padding: '20px'}} span={20}>
                <Card headStyle={{fontWeight: 'bold'}} title={data.title}>
                    <table>
                        <tr>
                            <td>
                                <b>Description</b>
                            </td>
                            <td>
                                
                                {data.description}
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Available Variants</b>
                            </td>
                            <td>
                               
                                {data.availableVariants.join(',')}
                               
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Price</b>
                            </td>
                            <td>
                              
                                {data.price} Rs
                               
                            </td>
                        </tr>
                        <tr>
                        <td></td>
                            <td>
                                <Rate value={data.averageRating} disabled />
                            </td>
                            
                        </tr>
                    </table>
                    
                  
                </Card>
                <br/>
                <Card>
                    {
                        reviews.map(r => <Review data={r} />)
                    }
                </Card>
            </Col>
        </Row>
    )
}
