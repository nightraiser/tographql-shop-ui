import React, { useState } from 'react'
import { Button } from 'antd';
import { postRequest } from '../../services/ApiService';
export default function AddToCart({ productId, isWhishlisted, cartId }) {
    const [loading, setloading] = useState(false);
    const [type, setType] = useState(isWhishlisted ? 'remove' : 'add');
    const [cId, setCId] = useState(cartId);
    const handleAddToCart = async () => {
        setloading(true);
        const res = await postRequest('/mycart', { item: productId});
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
