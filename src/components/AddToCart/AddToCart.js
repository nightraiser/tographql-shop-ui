import React, { useState } from 'react'
import { Button } from 'antd';
import { useMutation } from '@apollo/react-hooks'
import { postRequest } from '../../services/ApiService';
import { gql } from 'apollo-boost';

const ADD_TO_CART = gql`
    mutation AddToCart($id: String!){
        mycart(productId: $id) {
        _id
    }
}
`
export default function AddToCart({ productId, isWhishlisted, cartId }) {
    const [mycart] = useMutation(ADD_TO_CART);
    const [loading, setloading] = useState(false);
    const [type, setType] = useState(isWhishlisted ? 'remove' : 'add');
    const [cId, setCId] = useState(cartId);
    const handleAddToCart = async () => {
        setloading(true);
        const res = await mycart({
            variables: { id: productId}
        })
        setType("remove");
        setCId(res._id);
        setloading(false);
    }

    const handleDelete = async () => {
        setloading(true);
        await postRequest('/removeCart', {cId});
        setType("add");
        setloading(false);
    }
    
    return type === 'add' ? (
        <Button loading={loading} onClick={handleAddToCart} icon="shopping-cart" type="danger">Whishlist It</Button>
    ) : (
        <Button loading={loading} onClick={handleDelete} icon="delete" type="danger">UnWishIt</Button>

    )
}
